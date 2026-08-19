import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Profile.css";

function UserProfile() {

    const [profile, setProfile] = useState({});

    const [editMode, setEditMode] = useState(false);

    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        contactNumber: "",
        address: "",
        course: ""
    });

    useEffect(() => {

        const token = localStorage.getItem("token");

        axios.get(
            "http://localhost:8080/profile",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then((response) => {

            setProfile(response.data);

            setFormData({
                fullName: response.data.fullName || "",
                email: response.data.email || "",
                contactNumber: response.data.contactNumber || "",
                address: response.data.address || "",
                course: response.data.course || ""
            });

        })
        .catch((error) => {

            console.log(error);

        });

    }, []);

    const updateProfile = async () => {

        const token = localStorage.getItem("token");

        try {

            const response = await axios.put(
                "http://localhost:8080/profile/update",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setProfile(response.data);

            setEditMode(false);

            setMessage("Profile updated successfully");

        } catch (error) {

            console.log(error);

            setMessage("Profile update failed");

        }

    };

    return (

        <div className="profile-page">

            <div className="profile-card">

                <h2>My Profile</h2>

                <div className="profile-grid">

                    <div className="profile-item">
                        <label>Username</label>
                        <span>{profile.username}</span>
                    </div>

                    <div className="profile-item">
                        <label>Full Name</label>
                        <span>{profile.fullName}</span>
                    </div>

                    <div className="profile-item">
                        <label>Email</label>
                        <span>{profile.email}</span>
                    </div>

                    <div className="profile-item">
                        <label>Contact</label>
                        <span>{profile.contactNumber}</span>
                    </div>

                    <div className="profile-item">
                        <label>Address</label>
                        <span>{profile.address}</span>
                    </div>

                    <div className="profile-item">
                        <label>Course</label>
                        <span>{profile.course || "Not Assigned"}</span>
                    </div>

                    <div className="profile-item">
                        <label>Role</label>
                        <span>{profile.role?.name}</span>
                    </div>

                    <div className="profile-item">
                        <label>Status</label>
                        <span>{profile.status}</span>
                    </div>

                </div>

                <div className="profile-actions">

                    <button onClick={() => setEditMode(true)}>
                        Edit Profile
                    </button>

                </div>

                {editMode && (

                    <div className="edit-form">

                        <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    fullName: e.target.value
                                })
                            }
                            placeholder="Full Name"
                        />

                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value
                                })
                            }
                            placeholder="Email"
                        />

                        <input
                            type="text"
                            value={formData.contactNumber}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    contactNumber: e.target.value
                                })
                            }
                            placeholder="Contact Number"
                        />

                        <input
                            type="text"
                            value={formData.address}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    address: e.target.value
                                })
                            }
                            placeholder="Address"
                        />

                        <input
                            type="text"
                            value={formData.course}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    course: e.target.value
                                })
                            }
                            placeholder="Course"
                        />

                        <button onClick={updateProfile}>
                            Save Changes
                        </button>

                        {message && (
                            <p>{message}</p>
                        )}

                    </div>

                )}

            </div>

        </div>

    );

}

export default UserProfile;