import { useDispatch } from "react-redux";
import { COLLECTION_STATUSES } from "../../../constants/collection-statuses";
import { formatText } from "../../../utils/formatText";
import { updateCollectionStatusById } from "../../../state/collection/collectionSlice";
import Button from "../../ui/button/Button";

import "../FormStyle.css";
import "./UpdateStatusForm.css";
import { useState } from "react";

export default function UpdateStatusForm({ collection, onCancel }) {
    const dispatch = useDispatch();
    const currentStatus = collection.currentStatus;
    const [comment, setComment] = useState("");

    // Extract used statuses from status history
    const usedStatuses = collection.statusHistory.map(
        (entry) => entry.status
    );

    // Find the only valid next status
    const nextStatus = Object.values(COLLECTION_STATUSES).find(
        (status) => !usedStatuses.includes(status)
    );

    if (!nextStatus) {
        return (
            <div className="form update-status-form">
                <h2>Collection has checked out</h2>
                <p>No further status updates available.</p>

                <div className="actions">
                    <Button
                        type="button"
                        text="Cancel"
                        className="btn reject"
                        onClick={onCancel}
                    />
                </div>
            </div>
        );
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await dispatch(
                updateCollectionStatusById({
                    collectionId: collection.id,
                    status: nextStatus,
                    userId: "User ID", // This should come from auth state
                    comment: comment,
                })
            ).unwrap();

            onCancel();
        } catch (error) {
            console.error("Failed to update collection status:", error);
            alert("Failed to update status. Please try again.");
        }
    }

    return (
        <form className="form update-status-form" onSubmit={handleSubmit}>
            <h2>Status Update</h2>

            <div className="status-preview">
                <div className="status-row">
                    <span className="label">Current</span>
                    <span className={`badge ${currentStatus.toLowerCase()}`}>
                        {formatText(currentStatus)}
                    </span>
                </div>

                <div className="arrow">→</div>

                <div className="status-row">
                    <span className="label">Next</span>
                    <span className={`badge next ${nextStatus.toLowerCase()}`}>
                        {formatText(nextStatus)}
                    </span>
                </div>
            </div>

            <label>
                Comment (optional)
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </label>


            <div className="actions">
                <Button
                    type="button"
                    text="Cancel"
                    className="btn reject"
                    onClick={onCancel}
                />

                <Button
                    type="submit"
                    text="Update Status"
                    className="btn accept"
                />
            </div>
        </form>
    );
}