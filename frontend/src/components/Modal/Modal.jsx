import "./Modal.scss";

function Modal({ children, isOpen, onClose, id }) {
  return (
    isOpen && (
      <div className="modal-overlay" onClick={onClose}>
        <div
          id={id}
          className="modal-wrapper"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">{children}</div>
        </div>
      </div>
    )
  );
}

export default Modal;
