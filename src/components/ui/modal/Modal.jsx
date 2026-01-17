import "./Modal.css";

export default function Modal({ isOpen, onClose, modalTitle, children }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div
                className="modal-container"
            >
                <div className="modal-header">
                    <h4 className="modal-title">{modalTitle}</h4>
                </div>

                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
}
