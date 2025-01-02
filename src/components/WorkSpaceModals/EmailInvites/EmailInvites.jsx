import React, { useState, useEffect } from 'react';
import styles from './style.module.css';
import { toast } from 'react-toastify';

function EmailInvites() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [data, setData] = useState({
    email: "",
    access: "edit"
  });

  // Debounced search API call
  useEffect(() => {
    const handler = setTimeout(() => {
      if (search) {
        SearchApi(search); // Call API when debounced search value changes
      } else {
        setSuggestions([]); // Clear suggestions if input is empty
      }
    }, 300); // Delay of 300ms

    return () => {
      clearTimeout(handler); // Clear timeout if search value changes
    };
  }, [search]);

  // API call to search users
  const SearchApi = async (value) => {
    try {
      const response = await fetch(`https://formbuilderapp-server.onrender.com/secure/users/search?query=${value}`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const result = await response.json();
        setSuggestions(result.data || []);
      } else {
        throw new Error("Error fetching suggestions");
      }
    } catch (error) {
      console.error("Error fetching suggestions: ", error);
      setSuggestions([]);
    }
  };

  // Function to share dashboard
  const shareDashboard = async ({ email, access }) => {
    try {
      if (!email) {
        toast.error("Please provide a valid email address");
        return;
      }
      const response = await fetch('https://formbuilderapp-server.onrender.com/secure/dashboard/share', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, permission: access }),
      });

      if (response.ok) {
        toast.success("Dashboard Shared Successfully");
      } else {
        const errorData = await response.json();
        console.error("Failed to share dashboard:", errorData);
        toast.error(`Error: ${errorData.message || "Unable to share the dashboard"}`);
      }
    } catch (error) {
      console.error("Error sharing dashboard:", error);
      toast.error("An error occurred while sharing the dashboard.");
    }
  };

  // Handle search input change
  const handleSearch = (e) => {
    setSearch(e.target.value); // Update search input
  };

  // Select user from suggestions
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setData((prevData) => ({ ...prevData, email: user.email }));
    setSearch("");
    setSuggestions([]);
  };

  // Remove selected user
  const handleRemoveUser = () => {
    setSelectedUser(null);
    setData((prevData) => ({ ...prevData, email: "" }));
  };

  // Handle form submit
  const onSubmit = (e) => {
    e.preventDefault();

    console.log("Form Data:", data); // Debugging log to check data

    if (!data.email) {
      toast.error("Please select or enter a valid email address.");
      return;
    }
    shareDashboard(data); // Share dashboard with the email and access
    setSelectedUser(null);
    setData((prevData) => ({ ...prevData, email: "" }));
  };

  // Handle link sharing
  const onLinkShare = async () => {
    try {
      const response = await fetch('https://formbuilderapp-server.onrender.com/secure/dashboard/createLink', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ access: data.access }),
      });

      if (response.ok) {
        const result = await response.json();
        navigator.clipboard.writeText(`${window.location.origin}/getPermission/${result.data.link}`)
          .then(() => {
            toast.success("Link copied to clipboard!");
          })
          .catch((err) => {
            console.error("Failed to copy link: ", err);
            toast.error("Failed to copy link.");
          });
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message || "Unable to create link"}`);
      }
    } catch (error) {
      console.error("Error creating link:", error);
      toast.error("An error occurred while creating the link.");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <div className={styles.header}>
          <h3>Invite by Email</h3>
          <select
            value={data.access}
            onChange={(e) =>
              setData((prevData) => ({ ...prevData, access: e.target.value }))
            }
          >
            <option value="edit">Edit</option>
            <option value="view">View</option>
          </select>
        </div>
        <div className={styles.body}>
          {selectedUser ? (
            <div className={styles.selectedUser}>
              <span>{selectedUser.name} ({selectedUser.email})</span>
              <button
                type="button"
                onClick={handleRemoveUser}
                className={styles.removeButton}
              >
                ×
              </button>
            </div>
          ) : (
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search or enter email"
                value={search}
                onChange={handleSearch}
              />
              {suggestions.length > 0 && (
                <ol className={styles.suggestions}>
                  {suggestions.map((user, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelectUser(user)}
                    >
                      {user.name} ({user.email})
                    </li>
                  ))}
                </ol>
              )}
            </div>
          )}
          <button type="submit">Send Invite</button>
          <h3>Invite by Link</h3>
          <button type="button" onClick={onLinkShare}>
            Copy link
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmailInvites;
