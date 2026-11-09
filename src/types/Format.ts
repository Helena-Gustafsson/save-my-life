// Capitalize the first letter of a string
export const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

// "2026-10-18T10:37:57.547Z" → "18 Oct 2026"
// Allow deadlineDate to be optional (string | undefined)
// If date is missing, empty, or undefined, return a fallback text
export const formatDate = (deadlineDate: string | undefined) => {
  if (!deadlineDate) return "No deadline";

  return new Date(deadlineDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
