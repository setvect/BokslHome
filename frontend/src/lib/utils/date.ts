/**
 * Format a date string into relative time (e.g., "2일 전", "3주 전").
 * Falls back to ISO yyyy-MM-dd when older than `maxRelativeDays`.
 */
export function formatRelativeDate(dateText: string, maxRelativeDays = 30): string {
  const date = new Date(dateText);
  if (Number.isNaN(date.getTime())) return dateText;

  const diffSeconds = (Date.now() - date.getTime()) / 1000;
  if (diffSeconds < 0) return dateText;

  const diffDays = diffSeconds / 86400;
  if (diffDays > maxRelativeDays) {
    return date.toISOString().slice(0, 10);
  }

  if (diffSeconds < 60) return `${Math.floor(diffSeconds)}초 전`;
  if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}분 전`;
  if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)}시간 전`;
  if (diffSeconds < 604800) return `${Math.floor(diffSeconds / 86400)}일 전`;
  return `${Math.floor(diffSeconds / 604800)}주 전`;
}
