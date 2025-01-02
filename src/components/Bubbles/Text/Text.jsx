import React from 'react'
import styles from './index.module.css'
function Text({content}) {
  return (
    <div className={styles.container}>
        <span>{content}</span>
    </div>
  )
}

export default Text
