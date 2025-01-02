import React from 'react'
import styles from './style.module.css';
import flag from './../../assets/FormPage/Flag.svg'
import BubblesInFlow from '../BubblesInFlow/BubblesInFlow';
import InputInFlow from '../InputInFlow/InputInFlow';
import ButtonInFlow from '../ButtonInFlow/ButtonInFlow';
import { useForm } from '../../context/FormContext';
import Loading from './../../assets/Loading/loading.gif'

function WorkFlow({loading}) {
  const {form,setForm,formErrors,setFormErrors} = useForm();

  return (
<div className={styles.container}>
  <div className={styles.top}>
    <img src={flag} alt='flag'/>
    <span>Start</span>
  </div>
  {!loading ? (
    form?.elements?.map((element, index) => {
      let errorMessage = formErrors[element.label] || '';  // Get error message for the element if it exists

      // Render Bubbles
      if (element.superType === 'Bubbles') {
        return (
          <div key={index} className={styles.fieldContainer}>
            <BubblesInFlow 
              type={element.type} 
              label={element.label} 
              state={form} 
              setState={setForm} 
            />
            {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}  {/* Show error below */}
          </div>
        );
      } 
      
      // Render Buttons
      else if (element.superType === 'Inputs' && element.type === 'Buttons') {
        return (
          <div key={index} className={styles.fieldContainer}>
            <ButtonInFlow 
              label={element.label} 
              state={form} 
              setState={setForm} 
            />
            {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}  {/* Show error below */}
          </div>
        );
      }
      
      // Render other Inputs (e.g., Text, Number, etc.)
      else if (element.superType === 'Inputs') {
        return (
          <div key={index} className={styles.fieldContainer}>
            <InputInFlow 
              type={element.type} 
              label={element.label} 
            />
            {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}  {/* Show error below */}
          </div>
        );
      }
      
      return <p key={index}>Unsupported element</p>;
    })
  ) : (
    <img src={Loading} className='loading' alt='loading'/>
  )}
</div>

  )
}

export default WorkFlow
