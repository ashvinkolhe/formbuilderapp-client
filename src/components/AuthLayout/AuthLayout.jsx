import styles from './AuthLayout.module.css';
import React from 'react';
import {Link} from 'react-router-dom';
import Triangles from './../../assets/AuthPage/Triangles.svg';
import EclipseRight from './../../assets/AuthPage/Ellipseright.svg';
import EclipseBottom from './../../assets/AuthPage/Ellipsebottom.svg';
import Back from './../../assets/AuthPage/arrow_back.svg';
function AuthLayout( {children}) {

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to={"/"}>
          <img src={Back} alt='←'/>
        </Link>
      </div>
      <div className={styles.body}>
        <img className={styles.static1} src={Triangles} alt='Triangles'/>
        <div className={styles.content}>
          {children}
        </div>
        <img className={styles.static2} src={EclipseRight} alt='EclipseRight'/>
        <img className={styles.static3} src={EclipseBottom} alt='EclipseBottom'/>
                
      </div>
    </div>
  );
}

export default AuthLayout;
