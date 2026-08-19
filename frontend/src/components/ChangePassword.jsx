import { useState } from "react";
import axios from "axios";
function ChangePassword() {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        const token = localStorage.getItem("token");

        const response = await axios.put(
            "http://localhost:8080/profile/change-password",
            {
                oldPassword,
                newPassword,
                confirmPassword
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        alert(response.data);

        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");

    } catch (error) {

        alert(
            error.response?.data || "Failed to change password"
        );

    }

};
    return (
        <div>
            <h2>Change Password</h2>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Current Password</label><br />
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <label>New Password</label><br />
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <label>Confirm Password</label><br />
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <br />

                <button type="submit">
                    Change Password
                </button>

            </form>
        </div>
    );
}

export default ChangePassword;
