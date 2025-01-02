import React from 'react'
import styles from './index.module.css';
function ThemeComponent(WrappedComponent) {
  return (props) => {
    const theme = props.theme || 'light'
    return (
        <div className={`${styles[`theme-${theme}`]}`}>
            <WrappedComponent {...props} />
        </div>
      );
    };
}

export default ThemeComponent;
