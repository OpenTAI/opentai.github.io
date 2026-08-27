export type GitHubApiMember = {
  avatar_url: string;
  html_url: string;
  login: string;
};

export type OrganizationMember = {
  avatarUrl: string;
  displayName: string;
  githubHandle: string;
  htmlUrl: string;
};

export function prioritizeOrganizationMembers(
  members: readonly OrganizationMember[],
  primaryHandle: string,
) {
  const normalizedPrimary = primaryHandle.toLowerCase();

  return [...members].sort((left, right) => {
    const leftIsPrimary = left.githubHandle.toLowerCase() === normalizedPrimary;
    const rightIsPrimary = right.githubHandle.toLowerCase() === normalizedPrimary;
    return Number(rightIsPrimary) - Number(leftIsPrimary);
  });
}

export function mergeOrganizationMembers(
  apiMembers: readonly GitHubApiMember[],
  fallbackMembers: readonly OrganizationMember[],
  primaryHandle: string,
) {
  const knownDisplayNames = new Map(
    fallbackMembers.map((member) => [
      member.githubHandle.toLowerCase(),
      member.displayName,
    ]),
  );
  const publicMembers = apiMembers.map((member) => ({
    avatarUrl: member.avatar_url,
    displayName:
      knownDisplayNames.get(member.login.toLowerCase()) ?? member.login,
    githubHandle: member.login,
    htmlUrl: member.html_url,
  }));
  const publicHandles = new Set(
    publicMembers.map((member) => member.githubHandle.toLowerCase()),
  );

  return prioritizeOrganizationMembers(
    [
      ...publicMembers,
      ...fallbackMembers.filter(
        (member) => !publicHandles.has(member.githubHandle.toLowerCase()),
      ),
    ],
    primaryHandle,
  );
}
