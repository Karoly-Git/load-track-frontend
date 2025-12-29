import type { Lorry } from "../../../types/lorry";

import "./StatusBadge.css";

interface StatusBadgeProps {
    currentStatus: Lorry["currentStatus"];
}

export default function StatusBadge({ currentStatus }: StatusBadgeProps) {
    const formattedText = currentStatus
        .toLowerCase()
        .split("_")
        .join(" ");

    const statusClass = currentStatus.toLowerCase();

    return (
        <td className="current-status">
            <span className={`status-badge ${statusClass}`}>
                {formattedText}
            </span>
        </td>
    );
}
