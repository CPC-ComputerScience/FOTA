interface SequenceDisplayProps {
    sequence: string[];
  }
  
  const SequenceDisplay = ({ sequence }: SequenceDisplayProps) => {
    return (
      <div className="sequence-display">
        {sequence.map((color, index) => (
          <div key={index} className={`color-dot ${color}`} />
        ))}
      </div>
    );
  };
  
  export default SequenceDisplay;
  