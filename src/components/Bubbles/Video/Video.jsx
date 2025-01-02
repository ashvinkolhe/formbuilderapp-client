import React from 'react'
import styles from './style.module.css'
function Video({video}) {
    // const link = "link"
  return (
    <div className={styles.container}>
      <video width={400} controls>
        <source src={video} type='video/mp4' />
        Your browser doesn't support video. 
      </video>
    </div>
  )
}

export default Video
