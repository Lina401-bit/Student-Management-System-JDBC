import React, { useState } from "react";
import "../css/Settings.css";

function Settings() {

    const [name, setName] = useState("Lina");
    const [email, setEmail] = useState("lina@gmail.com");
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [message, setMessage] = useState("");

    const handleSave = (event) => {

        event.preventDefault();

        localStorage.setItem("adminName", name);
        localStorage.setItem("adminEmail", email);
        localStorage.setItem("darkMode", darkMode);
        localStorage.setItem("notifications", notifications);

        setMessage("Settings saved successfully!");

        setTimeout(() => {
            setMessage("");
        }, 3000);

    };


    return (

        <div className="settings-page">

            <div className="settings-header">

                <p className="settings-label">
                    SYSTEM
                </p>

                <h1>
                    Settings
                </h1>

                <p>
                    Manage your profile and application preferences.
                </p>

            </div>


            <form
                className="settings-card"
                onSubmit={handleSave}
            >

                <h2>
                    Profile Settings
                </h2>


                <div className="form-group">

                    <label>
                        Name
                    </label>

                    <input
                        type="text"
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                    />

                </div>


                <div className="form-group">

                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                    />

                </div>


                <h2 className="preferences-title">
                    Preferences
                </h2>


                <div className="setting-option">

                    <div>

                        <strong>
                            Dark Mode
                        </strong>

                        <p>
                            Change the appearance of the application.
                        </p>

                    </div>

                    <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={(event) =>
                            setDarkMode(event.target.checked)
                        }
                    />

                </div>


                <div className="setting-option">

                    <div>

                        <strong>
                            Notifications
                        </strong>

                        <p>
                            Receive system notifications.
                        </p>

                    </div>

                    <input
                        type="checkbox"
                        checked={notifications}
                        onChange={(event) =>
                            setNotifications(event.target.checked)
                        }
                    />

                </div>


                <button
                    type="submit"
                    className="save-settings-btn"
                >
                    Save Settings
                </button>


                {message && (

                    <p className="success-message">
                        {message}
                    </p>

                )}

            </form>

        </div>

    );

}

export default Settings;