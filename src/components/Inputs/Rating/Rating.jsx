import React, { useState } from 'react';
import style from './index.module.css';
import SendIcon from './../../../assets/FormPage/sendicon.svg'
function Rating({ label, onSave ,disabled }) {
  const [selectedRating, setSelectedRating] = useState(null);
  const [savedResponse, setSavedResponse] = useState(null); // Store the saved rating

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
  };

  const handleSave = () => {
    onSave(selectedRating, label); // Save the selected rating
    setSavedResponse(selectedRating); // Display the saved rating
  };

  return (
    <div className={style.container}>
      {savedResponse ? (
        <>
        <div className={!savedResponse ? style.input : style.saved}>
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              className={selectedRating == rating ? style.Rating : ""}
              key={rating}
              disabled={true}
            >
              {rating}
            </button>
          ))}
           
        </div>
        <div className={style.sent} onClick={handleSave}>
           <img src={SendIcon} alt='send'/>
           </div></>      
        ) : (
        <>
        <div className={!savedResponse ? style.input : style.saved}>
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              className={selectedRating == rating ? style.Rating : ""}
              key={rating}
              onClick={() => handleRatingClick(rating)}
              disabled={disabled}
            >
              {rating}
            </button>
          ))}
           
        </div>
        <div className={style.send} onClick={handleSave}>
           <img src={SendIcon} alt='send'/>
           </div></>
      )}
    </div>
  );
}

export default Rating;
