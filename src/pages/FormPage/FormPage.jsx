import React, { useEffect, useState } from 'react';
import NavBar2 from '../../components/NavBar2/HomeNav';
import withTheme from '../../components/ThemeComponent/ThemeComponent';
import WorkFlow from '../../components/WorkFlow/WorkFlow';
import styles from './style.module.css';
import { buttons, Date, Email, Gif, Image, Number, Phone, Rating, TextBubble, Textinput, Video } from './../../assets/FormPage';
import { useForm } from '../../context/FormContext';
import { useParams } from 'react-router-dom';

function FormPage({ mode }) {
  const { FormId } = useParams();
  const { form, setForm } = useForm();
  const [loading, setLoading] = useState(true);

  // Function to fetch form data
  const fetchForm = async (id) => {
    try {
      const response = await fetch(`https://formbuilderapp-server.onrender.com/public/forms/${id}`);
      const data = await response.json();
      if (response.ok) {
        setForm(data.form);
        console.log(data);
        setLoading(false);
      } else {
        throw new Error(data.message || 'Failed to fetch form');
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // Effect for fetching form on mount or when FormId changes
  useEffect(() => {
    setForm((prevData) => ({
      ...prevData,
      name: '',
      elements: [],
    }));

    if (mode === 'edit') {
      fetchForm(FormId);
    }
  }, [FormId]);

  // Function to handle adding a field
  const addElement = (name, superType) => {
    const count = form.elements.filter(
      (element) => element.type === name && element.superType === superType
    ).length + 1; // Count elements with the same type AND superType

    const isArrayType = name === 'Buttons'; // Example: Use array for "Buttons"
    const newElement = {
      label: `${superType} ${name} ${count}`,
      superType,
      type: name,
      value: '', // String for general cases
      buttonValues: name === 'Buttons' ? [] : undefined, // Array only for buttons
    };

    setForm((prev) => ({
      ...prev,
      elements: [...prev.elements, newElement],
    }));
  };

  const Bubbles = [
    { name: 'Text', icon: TextBubble },
    { name: 'Image', icon: Image },
    { name: 'Video', icon: Video },
    { name: 'Gif', icon: Gif },
  ];

  const inputs = [
    { name: 'Text', icon: Textinput },
    { name: 'Number', icon: Number },
    { name: 'Email', icon: Email },
    { name: 'Phone', icon: Phone },
    { name: 'Date', icon: Date },
    { name: 'Rating', icon: Rating },
    { name: 'Buttons', icon: buttons },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <NavBar2 loading={mode === 'edit' && loading} />
      </div>
      <div className={styles.body}>
        <div className={styles.left}>
          <div className={styles.Title}>
            <h3>Bubbles</h3>
          </div>
          <div className={styles.Fields}>
            {Bubbles.map((Bubble, index) => (
              <div
                key={index}
                className={styles.Field}
                onClick={() => addElement(Bubble.name, 'Bubbles')}
              >
                <img src={Bubble.icon} alt={Bubble.name} />
                <span>{Bubble.name}</span>
              </div>
            ))}
          </div>
          <div className={styles.Title}>
            <h3>Inputs</h3>
          </div>
          <div className={styles.Fields}>
            {inputs.map((input, index) => (
              <div
                key={index}
                className={styles.Field}
                onClick={() => addElement(input.name, 'Inputs')}
              >
                <img src={input.icon} alt={input.name} />
                <span>{input.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.right}>
          <WorkFlow loading={mode === 'edit' && loading} />
        </div>
      </div>
    </div>
  );
}

export default withTheme(FormPage);
