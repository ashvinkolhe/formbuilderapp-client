import React, { createContext, useContext, useState } from 'react';
import Modal from './../components/Modal/Modal';
import { useTheme } from './ThemeContext';
const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const { theme } = useTheme(); 

  const openModal = (content) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ 
        openModal,
        closeModal }}>
      {children}
      <Modal isOpen={isOpen} onClose={closeModal} theme={theme}>
        {modalContent}
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
