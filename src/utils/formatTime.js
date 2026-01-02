/**
 * Formats a timestamp into a short, human-readable time (HH:mm).
 *
 * Example:
 *  - "2025-12-27T08:30:00Z" → "08:30"
 *
 * @param {string | Date} timestamp - ISO timestamp or Date object.
 * @returns {string} Formatted time in 24-hour format.
 */
export const formatTime = (timestamp) => {
    if (!timestamp) return "";

    return new Date(timestamp).toLocaleTimeString("en-GB", {
        timeStyle: "short",
    });
};
