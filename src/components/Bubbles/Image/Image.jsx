import React from 'react'
import styles from './index.module.css';
function Image({image}) {
    // const link = "www.google.com"
  return (
    <div className={styles.container}>
      <img src={image} alt='image link'/>
    </div>
  )
}

export default Image
