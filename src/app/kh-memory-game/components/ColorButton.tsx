interface ColorButtonProps {
    color: string;
    onClick: () => void;
  }
  
  const ColorButton = ({ color, onClick }: ColorButtonProps) => {
    return (
      <button 
        onClick={onClick} 
        className={`color-button ${color}`}
      >
        {color}
      </button>
    );
  };
  
  export default ColorButton;
  