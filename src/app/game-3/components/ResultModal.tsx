interface ResultModalProps {
    pin: string;
    onClose: () => void;
  }
  
  const ResultModal = ({ pin, onClose }: ResultModalProps) => {
    return (
      <div className="modal">
        <p>Success! Your code is: {pin}</p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  };
  
  export default ResultModal;
  