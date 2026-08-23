export type ArenaScrollMetrics = {
  clientHeight: number;
  rowStep: number;
  scrollHeight: number;
  scrollTop: number;
};

export function nextArenaScrollTop({
  clientHeight,
  rowStep,
  scrollHeight,
  scrollTop,
}: ArenaScrollMetrics) {
  const maximum = Math.max(0, scrollHeight - clientHeight);
  if (maximum <= 1 || rowStep <= 0) return scrollTop;

  if (scrollTop >= maximum - 1) return 0;

  return Math.min(scrollTop + rowStep, maximum);
}
