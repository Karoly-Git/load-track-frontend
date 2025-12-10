import "./Modal.css";

export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-container"
                onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
            >
                <button className="modal-close-btn" onClick={onClose}>
                    ✕
                </button>

                {children}
            </div>
        </div>
    );
}

