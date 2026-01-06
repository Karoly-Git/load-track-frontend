import { useEffect } from "react";
import "./Modal.css";

export default function Modal({ isOpen, onClose, children }) {
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
                document.activeElement.blur();
            };
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleOverlayClick = () => onClose();
    const stopPropagation = (e) => e.stopPropagation();

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-container" onClick={stopPropagation}>
                <button className="modal-close-btn" onClick={onClose}>
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
}
