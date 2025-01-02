import './index.css';
import React from 'react'

function Modal({ isOpen, onClose, children, theme }) {
    if (!isOpen) return null;
    const dark = {background:'#18181B', color:'white'}
    const light = {background:'white', color:'#18181B'}
  return (
    <div  className="modal-overlay" onClick={onClose}>
      <div style={theme?dark:light} className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );

}

export default Modal
