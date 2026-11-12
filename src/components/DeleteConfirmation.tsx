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
  <div>
    <p>{message}</p>

    <button onClick={onConfirm}>Delete</button>
    <button onClick={onCancel}>Cancel</button>
  </div>
);
}

export default DeleteConfirmation;