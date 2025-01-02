import styles from './style.module.css';
import React, { useEffect, useState } from 'react';
import ToggleButton from '../ToggleButton/ToggleButton';
import { useForm } from '../../context/FormContext';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from './../../assets/Loading/loading.gif';

function NavBar2({ loading }) {
  const { dashboardId, FolderId, FormId } = useParams();
  const [formId, setFormId] = useState(FormId || '');
  const { form, setForm, formErrors, setFormErrors } = useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoBack = () => {
    const basePath = location.pathname.split('/editForm')[0];
    navigate(basePath);
  };

  useEffect(() => {
    setForm(() => ({
      folder: FolderId,
    }));
  }, [FolderId, setForm]);

  const isFormValid = () => {
    let errors = {}; // This will store error messages
    let isValid = true;

    form.elements.forEach((element) => {
      // Check for Bubbles
      if (element.superType === 'Bubbles') {
        if (element.value.trim().length < 1) {
          errors[element.label] = 'This field cannot be empty.';
          isValid = false;
        }
      }
      // Check for Buttons
      else if (element.superType === 'Inputs' && element.type === 'Buttons') {
        if (element.buttonValues.length === 0) {
          errors[element.label] = 'Please add at least one button.';
          isValid = false;
        } else {
          element.buttonValues.forEach((button, index) => {
            if (button.value.trim().length < 1) {
              errors[element.label] = 'Button value cannot be empty.';
              isValid = false;
            }
          });
        }
      }
      // Add additional validation for other field types here
    });
    setFormErrors(errors); // Update the error state
    return isValid; // Return whether the form is valid
  };

  const onSave = async () => {
    if (!isFormValid()) {
      toast.error('Please fill in complete data');
    } else {
      let config = {
        endpoint: 'https://formbuilderapp-server.onrender.com/secure/forms', // Direct API call
        includeToken: true,
        method: 'POST',
        data: form,
      };

      if (formId) {
        config = {
          endpoint: `https://formbuilderapp-server.onrender.com/secure/forms/${formId}`, // Direct API call with formId
          method: 'PATCH',
          includeToken: true,
          data: form,
        };
      }

      try {
        const response = await fetch(config.endpoint, {
          method: config.method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Add token if required
          },
          body: JSON.stringify(config.data),
        });

        const responseData = await response.json();

        if (response.status === 201) {
          toast.success('The form is created successfully');
          setFormId(responseData.form._id);
        }

        if (response.status === 200) {
          toast.success('The form is updated successfully');
          setFormId(responseData.form._id);
        }
      } catch (error) {
        toast.error('Error saving the form, please try again');
      }
    }
  };

  const shareForm = () => {
    const fullDomain = window.location.hostname + (window.location.port ? `:${window.location.port}` : '');
    const link = `${fullDomain}/FormSubmit/${formId}`;
    navigator.clipboard.writeText(link)
      .then(() => {
        toast.success('Link copied to clipboard!');
      })
      .catch(err => {
        toast.error('Failed to copy the link.');
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {
          !loading
            ? <input type='text' placeholder='Enter Form Name' value={form.name} onChange={(e) => setForm((prevData) => ({ ...prevData, name: e.target.value }))} />
            : <img src={Loading} className='loading' alt='loading' />
        }
      </div>
      <div className={styles.middle}>
        <button
          onClick={() => navigate(`/${dashboardId}/workspace/${FolderId}/editForm/${FormId}`)}
          className={styles.activeButton}
        >
          Flow
        </button>
        <button
          onClick={() => {
            if (!formId) {
              toast.error('Please save the form first');
            } else {
              navigate(`/${dashboardId}/workspace/${FolderId}/responses/${formId}`);
            }
          }}
          className={styles.notselected}
        >
          Response
        </button>
      </div>
      <div className={styles.right}>
        <ToggleButton />
        <button
          className={`${styles.rightButtons} ${formId ? styles.Active : ''}`}
          disabled={!formId}
          onClick={shareForm}
        >
          Share
        </button>
        <button className={styles.save} onClick={onSave}>Save</button>
        <button onClick={handleGoBack} className={styles.x}>X</button>
      </div>
    </div>
  );
}

export default NavBar2;
