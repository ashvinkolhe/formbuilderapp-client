import { useState } from 'react';
import styles from './index.module.css';

const Dropdown = ({ children ,active}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className={styles.dropdown}>
      <button onClick={toggleMenu} className={styles.userName}>
        {active}'s dashboard
      </button>
      {isOpen && <div className={styles.dropdownMenu}>{children}</div>}
    </div>
  );
};

export default Dropdown;
