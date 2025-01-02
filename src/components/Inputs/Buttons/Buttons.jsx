import React, { useState } from 'react';
import styles from './index.module.css';
function Buttons({ label, choices, onSave ,disabled}) {
  const [selectedChoice, setSelectedChoice] = useState(null);

  const handleButtonClick = (choice) => {
    setSelectedChoice(choice);
    onSave(choice, label);  // Save the value as soon as a button is clicked
  };

  return (
    <div className={styles.container}>
      {selectedChoice ? (
        <div className={styles.selectedChoice}>{selectedChoice}</div>  // Display selected value as a sent message
      ) : (
        <div className={styles.choices}>
          {choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(choice.value)}
              disabled={selectedChoice || disabled} // Disable further clicks once a choice is made
            >
              {choice.value}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Buttons;
