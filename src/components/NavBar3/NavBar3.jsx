import styles from './style.module.css';
import React from 'react'
import ToggleButton from '../ToggleButton/ToggleButton';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {toast} from 'react-toastify';

function NavBar3() {
    const {dashboardId,FolderId,FormId} = useParams();
    const location = useLocation();

    const handleGoBack = () => {
      const basePath = location.pathname.split('/responses')[0];
      navigate(basePath);
    };
  
    const navigate = useNavigate();
    const shareForm = () => {
        const fullDomain = window.location.hostname + (window.location.port ? `:${window.location.port}` : '');
        const link = `${fullDomain}/FormSubmit/${FormId}`;
        navigator.clipboard.writeText(link)
          .then(() => {
            toast.success("Link copied to clipboard!");
          })
          .catch(err => {
            toast.error("Failed to copy the link.");
          });
      };
    
  return (
    <div className={styles.container}>
    <div></div>
      <div className={styles.middle}>
        <button
        onClick={() => navigate(`/${dashboardId}/workspace/${FolderId}/editForm/${FormId}`)}
        className={styles.notselected}
        >
            Flow
        </button>
        <button
        onClick={() => navigate(`/${dashboardId}/workspace/${FolderId}/responses/${FormId}`)}
        className={styles.activeButton }
        >
            Response
        </button>
      </div>
        <div className={styles.right}>
            <ToggleButton/>
            <button className={`${styles.rightButtons} ${ styles.Active}`} onClick={shareForm}>Share</button>
            <button className={styles.save} onClick={
                // onSave
                ()=>toast.success("form is saved")
                }>Save</button>
            <button onClick={handleGoBack} className={styles.x}>X</button>
        </div>
    </div>
  )
}

export default NavBar3
