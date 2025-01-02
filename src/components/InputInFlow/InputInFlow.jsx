import React from 'react'
import styles from './style.module.css';
import deleteIcon from './../../assets/Workspace/delete.svg';
import {buttons,Date,Email,Number,Phone,Rating,Textinput} from './../../assets/FormPage';
import { useForm } from '../../context/FormContext';

function InputInFlow({type , label}) {
  const {form,setForm}= useForm();
      const payload = [
        {
          name:"Text",
          icon:Textinput,
          placeholder:"Hint : User will input a text on his form"
        },
        {
          name:"Number",
          icon:Number,
          placeholder:"Hint : User will input a number on his form"
        },
        {
          name:"Email",
          icon:Email,
          placeholder:"Hint : User will input a email on his form"
        },
        {
          name:"Phone",
          icon:Phone,
          placeholder:"Hint : User will input a phone on his form"
        },
        {
          name:"Date",
          icon:Date,
          placeholder:"Hint : User will select a date"
        },
        {
          name:"Rating",
          icon:Rating,
          placeholder:"Hint : User will tap to rate out of 5"
  
        },
        {
          name:"Button",
          icon:buttons,
          placeholder:"Hint : User wil select on of many buttons and select what response it wants to give, Add the choices below"
        },
      ];

      const object = payload.find((item) => item.name == type) || {
        name: "Unknown",
        icon: "", // Default or placeholder icon
        placeholder: "Unsupported type",
      };
    
  const deleteButton = (label) => {
    console.log(label);
    setForm((prevdata) => ({
      ...prevdata, // Keep other properties of prevdata intact
      elements: prevdata.elements.filter((item) => item.label !== label),
    }));
  };

  return (
    <div className={styles.container}>
        <div onClick={(e)=>{
        e.stopPropagation()
        deleteButton(label)}} className={styles.deleteIcon}>
      <img  src={deleteIcon} alt='deleteicon'/>
        </div>
      <span>
        {label}
      </span>
      <div className={styles.input}>
        <img src={object.icon} alt={object.name}/>
        {/* <input type='text' placeholder={object.placeholder}/> */}
        <p>{object.placeholder}</p>
      </div>
    </div>
  )
}

export default InputInFlow
