import React, { useState } from 'react'
import styles from './Delete.module.css'
function Delete({name,id,onDelete,cancel}) {
  const onSubmit = async(e)=>{
    e.preventDefault();
    await onDelete(id);
  }
  return (
    <form onSubmit={ onSubmit}>
    <div  className={styles.container}> 
      <h2>Are you sure you want to delete this {name}</h2>
      <div className={styles.body}>
        <button type='submit' className={styles.deleteButton}>Confirm</button>
        <hr />
        <button type='reset' onClick={cancel} className={styles.cancelButton}>Cancel</button>
      </div>
    </div>
    </form>
  )
}

export default Delete;
