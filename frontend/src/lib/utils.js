export function formatTimestamp(timestamp) {
    try {
        const date = new Date(timestamp);
        return `${date.toISOString().slice(0, 16).replace("T", " ")}`;
    } catch {
        return "";
    }
}