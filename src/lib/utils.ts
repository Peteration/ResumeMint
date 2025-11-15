// src/lib/utils.ts
export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function truncateText(text: string, limit = 100) {
  return text.length > limit ? text.substring(0, limit) + "..." : text;
}

export function generateId(prefix = "resume") {
  return `${prefix}_${Math.random().toString(36).substring(2, 10)}`;
}
