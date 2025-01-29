import React, { useState, useEffect } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [form, setForm] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      const formattedUsers = response.data.map((user) => ({
        id: user.id,
        firstName: user.name.split(" ")[0],
        lastName: user.name.split(" ")[1] || "",
        email: user.email,
        department: "Unknown",
      }));
      setUsers(formattedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users. Please try again later.");
    }
  };

  const handleAddEditUser = async () => {
    try {
      if (selectedUser) {
        // Edit user
        const response = await axios.put(
          `https://jsonplaceholder.typicode.com/users/${selectedUser.id}`,
          form
        );
        if (response.status === 200) {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === selectedUser.id ? { ...form } : user
            )
          );
        }
      } else {
        // Add user
        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/users",
          form
        );
        if (response.status === 201) {
          const newUser = { ...form, id: users.length + 1 };
          setUsers((prevUsers) => [...prevUsers, newUser]);
        }
      }
      resetForm();
    } catch (error) {
      console.error("Error saving user:", error);
      setError("Failed to save user. Please try again later.");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      if (response.status === 200) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user. Please try again later.");
    }
  };

  const resetForm = () => {
    setForm({ id: "", firstName: "", lastName: "", email: "", department: "" });
    setSelectedUser(null);
    setIsDialogOpen(false);
    setError(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const openEditDialog = (user) => {
    setSelectedUser(user);
    setForm(user);
    setIsDialogOpen(true);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">User Management Dashboard</h1>
      {error && <p>{error}</p>}
      <button className="edt-btn" onClick={() => setIsDialogOpen(true)}>
        Add User
      </button>
      <div className="user-card">
        {users.map((user) => (
          <card key={user.id}>
            <cardContent>
              <p>
                <strong>ID:</strong> {user.id}
              </p>
              <p>
                <strong>First Name:</strong> {user.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {user.lastName}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Department:</strong> {user.department}
              </p>
              <div>
                <button
                  className="edt-btn"
                  onClick={() => openEditDialog(user)}
                >
                  Edit
                </button>
                <button
                  variant="destructive"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </div>
            </cardContent>
          </card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <h2>{selectedUser ? "Edit User" : "Add User"}</h2>
          <form
            className="form-input"
            onSubmit={(e) => {
              e.preventDefault();
              handleAddEditUser();
            }}
          >
            <input
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleFormChange}
              required
            />
            <input
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleFormChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleFormChange}
              required
            />
            <input
              name="department"
              placeholder="Department"
              value={form.department}
              onChange={handleFormChange}
            />
            <div>
              <button className="edt-btn" type="submit">
                Save
              </button>
              <button onClick={resetForm}>Cancel</button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default App;
