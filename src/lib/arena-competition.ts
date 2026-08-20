export type ArenaChallenge = {
  id: string;
  name: string;
  status: "draft" | "published";
};

export type ArenaLeaderboardEntry = {
  challengeId: string;
  participant: string;
  model: string;
  score: number;
  capabilityScore?: number;
  evidenceUrl: string;
  verified: boolean;
};

export function buildArenaCompetitionState({
  challenges,
  entries,
}: {
  challenges: ArenaChallenge[];
  entries: ArenaLeaderboardEntry[];
}) {
  const publishedChallenges = challenges.filter(
    (challenge) => challenge.status === "published",
  );
  const publishedChallengeIds = new Set(
    publishedChallenges.map((challenge) => challenge.id),
  );
  const leaderboard = entries
    .filter(
      (entry) =>
        entry.verified &&
        Boolean(entry.evidenceUrl) &&
        publishedChallengeIds.has(entry.challengeId),
    )
    .sort((left, right) => right.score - left.score)
    .map((entry, index) => ({ ...entry, rank: index + 1 }));

  return {
    challengeCount: publishedChallenges.length,
    challenges: publishedChallenges,
    leaderboard,
    verifiedResultCount: leaderboard.length,
  };
}
