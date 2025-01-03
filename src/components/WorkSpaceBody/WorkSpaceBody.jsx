import styles from './WorkSpaceBody.module.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useModal } from './../../context/ModalContext';
import CreateNewFolder from './../WorkSpaceModals/CreateNewFolder/CreateNewFolder';
import Delete from './../WorkSpaceModals/Delete/Delete';
import FolderIcon from './../../assets/Workspace/FolderIcon.svg';
import DeleteIcon from './../../assets/Workspace/delete.svg';
import { useFolder } from '../../context/FolderContext';
import { toast } from 'react-toastify';
import Loading from './../../assets/Loading/loading.gif';

function WorkSpaceBody() {
  const navigate = useNavigate();
  const { FolderId, dashboardId } = useParams();
  const { folders, forms, getFolders, getForms, setFolders, setForms } = useFolder();
  const { openModal, closeModal } = useModal();
  const [loading, setLoading] = useState(true);

  // Fetch folders on initial load
  useEffect(() => {
    getFolders(dashboardId);
  }, [dashboardId]);

  // Handle folder changes and update forms
  useEffect(() => {
    getForms(FolderId);
    if (folders.length > 0) {
      setLoading(false);
    }
  }, [folders, FolderId]);

  const creatForm = () => {
    if (!FolderId) {
      const firstFolderId = folders.length > 0 ? folders[0]._id : null;
      if (firstFolderId) {
        navigate(`${firstFolderId}/createForm`);
      }
    } else {
      navigate('createForm');
    }
  };

  const editForm = (id) => {
    if (!FolderId) {
      const firstFolderId = folders.length > 0 ? folders[0]._id : null;
      if (firstFolderId) {
        navigate(`${firstFolderId}/editForm/${id}`);
      }
    } else {
      navigate(`editForm/${id}`);
    }
  };

  const AddFolder = async (foldername) => {
    try {
      const response = await fetch(`https://formbuilderapp-server.onrender.com/secure/folders/${dashboardId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ name: foldername }),
      });

      const data = await response.json();

      if (response.status === 201) {
        setFolders((prev) => [...prev, data.folder]);
        closeModal();
        toast.success('Folder Created successfully');
      }
    } catch (error) {
      toast.error('Failed to create folder');
    }
  };

  const DeleteFolder = async (folderId) => {
    try {
      const response = await fetch(`https://formbuilderapp-server.onrender.com/secure/folders/${folderId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        setFolders((prev) => prev.filter((item) => item._id !== folderId));
        closeModal();
        toast.success('Folder Deleted Successfully');
      }
    } catch (error) {
      toast.error('Failed to delete folder');
    }
  };

  const DeleteForm = async (formId) => {
    try {
      const response = await fetch(`https://formbuilderapp-server.onrender.com/secure/forms/${formId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        setForms((prev) => prev.filter((item) => item._id !== formId));
        closeModal();
        toast.success('Form Deleted Successfully');
      }
    } catch (error) {
      toast.error('Failed to delete form');
    }
  };

  const createFolder = () => openModal(<CreateNewFolder AddFolder={AddFolder} cancel={closeModal} />);
  const deleteSomething = ({ something, id, onDelete }) =>
    openModal(<Delete name={something} id={id} onDelete={onDelete} cancel={closeModal} />);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div onClick={!loading ? createFolder : null} className={styles.Folders}>
          <img src={FolderIcon} alt="📁" />
          Create a Folder
        </div>
        {loading ? (
          <img className="loading" src={Loading} />
        ) : (
          folders
            .filter((folder) => folder.name !== 'Default') // Exclude Default folder here
            .map((folder) => (
              <div
                key={folder._id}
                onClick={() => navigate(`/${dashboardId}/workspace/${folder._id}`)}
                className={`${styles.Folders} ${
                  FolderId === folder._id ? styles.Active : ''
                }`}
              >
                <span>{folder.name}</span>
                <img
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSomething({ something: 'folder', id: folder._id, onDelete: DeleteFolder });
                  }}
                  src={DeleteIcon}
                  alt="🗑️"
                />
              </div>
            ))
        )}
      </div>
      <div className={styles.body}>
        <div
          onClick={!loading ? creatForm : null}
          style={{ flexDirection: 'column', background: '#1A5FFF' }}
          className={styles.Forms}
        >
          <p style={{ fontSize: '40px' }}>+</p>
          <span>Create a typebot</span>
        </div>
        {loading ? (
          <img className="loading" src={Loading} />
        ) : (
          forms.map((form) => (
            <div onClick={() => editForm(form._id)} key={form._id} className={styles.Forms}>
              <span>{form.name}</span>
              <img
                onClick={(e) => {
                  e.stopPropagation();
                  deleteSomething({ something: 'form', id: form._id, onDelete: DeleteForm });
                }}
                src={DeleteIcon}
                alt="🗑️"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default WorkSpaceBody;
