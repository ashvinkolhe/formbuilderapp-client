import React, { useState } from 'react';
import style from './index.module.css';
import SendIcon from './../../../assets/FormPage/sendicon.svg';

function Text({ label, onSave, type, disabled }) {
  const [inputValue, setInputValue] = useState('');
  const [savedResponse, setSavedResponse] = useState(null);
  const [error, setError] = useState(null);

  const validateInput = (value) => {
    switch (type) {
      case 'Phone':
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(value);
      case 'Number':
        return !isNaN(value);
      case 'Text':
        return /^[a-zA-Z\s]+$/.test(value);
      case 'Date':
        return !isNaN(Date.parse(value));
      case 'Email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      default:
        return false; 
    }
  };

  const handleSave = () => {
    if (!inputValue) {
      setError('Input cannot be empty'); 
      return;
    }
    if (validateInput(inputValue)) {
      setError(null);
      onSave(inputValue, label);
      setSavedResponse(inputValue);
      setInputValue(''); 
    } else {
      setError(`Invalid ${type.toLowerCase()} format`); 
    }
  };

  return (
    <div className={style.container}>
      {savedResponse ? (
        <div className={style.savedResponse}>
          <span>{savedResponse}</span>
          <button>
            <img src={SendIcon} alt="send" />
          </button>
        </div>
      ) : (
        <>
          <div className={style.input}>
            <input
              type={type === 'Phone' ? 'tel' : type === 'Number' ? 'text' : type}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={disabled}
              placeholder={`Enter the ${type}`}
            />
            <button onClick={handleSave} disabled={disabled}>
              <img src={SendIcon} alt="send" />
            </button>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
      )}
    </div>
  );
}

export default Text;
