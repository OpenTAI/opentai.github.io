"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { contributors } from "@/lib/contributors";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import {
  mergeOrganizationMembers,
  prioritizeOrganizationMembers,
} from "@/lib/organization-members";
import type {
  GitHubApiMember,
  OrganizationMember,
} from "@/lib/organization-members";

const GITHUB_ORG_MEMBERS_API =
  "https://api.github.com/orgs/OpenTAI/members?per_page=100";
const GITHUB_ORG_PEOPLE_URL = "https://github.com/orgs/OpenTAI/people";
const CACHE_KEY = "opentai-public-github-members-v2";
const CACHE_TTL_MS = 60 * 60 * 1000;
const MAX_PAGES = 10;
const PRIMARY_MEMBER_HANDLE = "GabryGao";

type CachedMembers = {
  fetchedAt: number;
  members: OrganizationMember[];
};

const fallbackMembers: OrganizationMember[] = contributors.map((contributor) => ({
  avatarUrl: contributor.avatarUrl,
  displayName: contributor.displayName,
  githubHandle: contributor.githubHandle,
  htmlUrl: contributor.profileUrl,
}));

function isOrganizationMember(value: unknown): value is OrganizationMember {
  if (!value || typeof value !== "object") return false;
  const member = value as Partial<OrganizationMember>;
  return (
    typeof member.avatarUrl === "string" &&
    typeof member.displayName === "string" &&
    typeof member.githubHandle === "string" &&
    typeof member.htmlUrl === "string"
  );
}

function isGitHubApiMember(value: unknown): value is GitHubApiMember {
  if (!value || typeof value !== "object") return false;
  const member = value as Partial<GitHubApiMember>;
  return (
    typeof member.avatar_url === "string" &&
    typeof member.html_url === "string" &&
    typeof member.login === "string"
  );
}

function readCachedMembers(): OrganizationMember[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw) as Partial<CachedMembers>;
    if (
      typeof cached.fetchedAt !== "number" ||
      Date.now() - cached.fetchedAt >= CACHE_TTL_MS ||
      !Array.isArray(cached.members) ||
      !cached.members.every(isOrganizationMember)
    ) {
      return null;
    }
    return prioritizeOrganizationMembers(
      cached.members,
      PRIMARY_MEMBER_HANDLE,
    );
  } catch {
    return null;
  }
}

function cacheMembers(members: OrganizationMember[]) {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ fetchedAt: Date.now(), members } satisfies CachedMembers),
    );
  } catch {
    // Storage can be unavailable in privacy modes. The live request still works.
  }
}

async function fetchPublicOrganizationMembers(signal: AbortSignal) {
  const members: GitHubApiMember[] = [];

  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const response = await fetch(`${GITHUB_ORG_MEMBERS_API}&page=${page}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      signal,
    });
    if (!response.ok) throw new Error(`GitHub members request failed: ${response.status}`);

    const payload: unknown = await response.json();
    if (!Array.isArray(payload)) throw new Error("GitHub members response was not a list");
    const pageMembers = payload.filter(isGitHubApiMember);
    members.push(...pageMembers);
    if (payload.length < 100) break;
  }

  return mergeOrganizationMembers(
    members,
    fallbackMembers,
    PRIMARY_MEMBER_HANDLE,
  );
}

export function OrganizationContributors({ locale }: { locale: Locale }) {
  const [members, setMembers] = useState<OrganizationMember[]>(() =>
    prioritizeOrganizationMembers(fallbackMembers, PRIMARY_MEMBER_HANDLE),
  );

  useEffect(() => {
    const cachedMembers = readCachedMembers();
    if (cachedMembers) {
      let cancelled = false;
      queueMicrotask(() => {
        if (!cancelled) setMembers(cachedMembers);
      });
      return () => {
        cancelled = true;
      };
    }

    const controller = new AbortController();
    fetchPublicOrganizationMembers(controller.signal)
      .then((nextMembers) => {
        setMembers(nextMembers);
        cacheMembers(nextMembers);
      })
      .catch(() => {
        // Keep the team-verified fallback when GitHub is unavailable or rate-limited.
      });

    return () => controller.abort();
  }, []);

  return (
    <>
      <div
        aria-label={t(locale, "OpenTAI GitHub Organization Members")}
        className="contributor-profile-grid"
      >
        {members.map((member) => (
          <a
            aria-label={`${member.displayName} on GitHub`}
            className="contributor-profile-card"
            href={member.htmlUrl}
            key={member.githubHandle}
            rel="noreferrer"
            target="_blank"
            title={`${member.displayName} (@${member.githubHandle})`}
          >
            <Image
              alt={`${member.displayName} GitHub avatar`}
              className="contributor-profile-avatar"
              height={72}
              src={member.avatarUrl}
              unoptimized
              width={72}
            />
            <span className="sr-only">
              <strong>{member.displayName}</strong>
              <small>@{member.githubHandle}</small>
            </span>
          </a>
        ))}
      </div>
      <a
        className="contributor-organization-link"
        href={GITHUB_ORG_PEOPLE_URL}
        rel="noreferrer"
        target="_blank"
      >
        {t(locale, "View Organization Members")} ↗
      </a>
    </>
  );
}
