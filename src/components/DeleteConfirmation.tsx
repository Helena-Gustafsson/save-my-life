type DeleteConfirmationProps = {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

function DeleteConfirmation({
  isOpen,
  message,
  onConfirm,
  onCancel,
}: DeleteConfirmationProps) {
  if (!isOpen) {
    return null;
  }

  return (
  <div className="delete-confirmation">
    <p>{message}</p>

    <div className="action-buttons">
      <button
        className="delete-button"
        onClick={onConfirm}
      >
        Delete
      </button>

      <button onClick={onCancel}>
        Cancel
      </button>
    </div>
  </div>
  );
}

export default DeleteConfirmation;