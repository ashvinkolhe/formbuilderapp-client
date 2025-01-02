import React from 'react';
import styles from './style.module.css';
import deleteIcon from './../../assets/Workspace/delete.svg';
import { Gif, Image, TextBubble, Video } from './../../assets/FormPage';

function BubblesInFlow({ type, label, state, setState }) {
  // Access the value of the field from the state
  const value = state.elements.find((item) => item.label === label)?.value || '';

  // Handle the input change
  const onChange = (e) => {
    setState((prevData) => {
      const updatedElements = prevData.elements.map((item) => {
        if (item.label === label) {
          return { ...item, value: e.target.value };  // Update the value field
        }
        return item;
      });

      return { ...prevData, elements: updatedElements };  // Return updated state
    });
  };

  const deleteButton = (label) => {
    console.log(label);
    setState((prevdata) => ({
      ...prevdata, // Keep other properties of prevdata intact
      elements: prevdata.elements.filter((item) => item.label !== label),
    }));
  };
  
  
  const payload = [
    {
      name: "Text",
      icon: TextBubble,
      placeholder: "Click here to edit",
    },
    {
      name: "Image",
      icon: Image,
      placeholder: "Click to add the link",
    },
    {
      name: "Video",
      icon: Video,
      placeholder: "Click to add the link",
    },
    {
      name: "Gif",
      icon: Gif,
      placeholder: "Click to add the link",
    },
  ];

  // Find the object that matches the type
  const object = payload.find((item) => item.name === type) || {
    name: "Unknown",
    icon: "", // Default or placeholder icon
    placeholder: "Unsupported type",
  };

  return (
    <div className={styles.container}>
      <div onClick={(e)=>{
          e.stopPropagation()
          deleteButton(label)}} className={styles.deleteIcon}>
        <img  src={deleteIcon} alt="delete icon" />
      </div>
      <span>{label}</span>
      <div className={styles.input}>
        <img src={object.icon} alt={object.name} />
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={object.placeholder}
        />
      </div>
    </div>
  );
}

export default BubblesInFlow;
