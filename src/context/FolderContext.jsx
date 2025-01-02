import React, { createContext, useContext, useState } from 'react';
import { useToken } from './TokenContext';

const FolderContext = createContext();

export const FolderProvider = ({ children }) => {
  const [folders, setFolders] = useState([]);
  const [forms, setForms] = useState([]);
  const { token } = useToken();

  // Fetch folders from backend
  const getFolders = async (userId) => {
    try {
      const response = await fetch(`https://formbuilderapp-server.onrender.com/secure/folders/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setFolders(data.folders);
      } else {
        console.error('Failed to fetch folders:', response.status);
      }
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  };

  // Fetch forms from the selected folder
  const getForms = (folderId) => {
    let selectedFolder;
    if (!folderId) {
      selectedFolder = folders.find((folder) => folder.name === 'Default');
    } else {
      selectedFolder = folders.find((folder) => folder._id === folderId);
    }
    setForms(selectedFolder?.forms || []);
  };

  // Add a new folder
  const addFolder = async (folderName, userId) => {
    try {
      const response = await fetch(`https://formbuilderapp-server.onrender.com/secure/folders/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: folderName }),
      });

      if (response.status === 201) {
        const data = await response.json();
        setFolders((prevFolders) => [...prevFolders, data.folder]);
      } else {
        console.error('Failed to create folder:', response.status);
      }
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  };

  // Delete a folder
  const deleteFolder = async (folderId) => {
    try {
      const response = await fetch(`https://formbuilderapp-server.onrender.com/secure/folders/${folderId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setFolders((prevFolders) => prevFolders.filter((folder) => folder._id !== folderId));
      } else {
        console.error('Failed to delete folder:', response.status);
      }
    } catch (error) {
      console.error('Error deleting folder:', error);
    }
  };

  // Update folder (if needed)
  const updateFolder = async (folderId, newName) => {
    try {
      const response = await fetch(`https://formbuilderapp-server.onrender.com/secure/folders/${folderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newName }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setFolders((prevFolders) => prevFolders.map((folder) =>
          folder._id === folderId ? { ...folder, name: newName } : folder
        ));
      } else {
        console.error('Failed to update folder:', response.status);
      }
    } catch (error) {
      console.error('Error updating folder:', error);
    }
  };

  return (
    <FolderContext.Provider
      value={{
        folders,
        setFolders,
        forms,
        setForms,
        getFolders,
        getForms,
        addFolder,
        deleteFolder,
        updateFolder,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};

export const useFolder = () => useContext(FolderContext);
