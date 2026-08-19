import React, { useEffect, useState } from "react";
import "../css/Users.css";


function Users() {


    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");



    // ================================
    // GET ROLE NAME SAFELY
    // ================================

    const getRoleName = (role) => {


        if (typeof role === "string") {

            return role.toLowerCase();

        }


        if (typeof role === "number") {

            return role === 1
                ? "admin"
                : "user";

        }


        if (
            typeof role === "object" &&
            role !== null
        ) {

            return role.name
                ?.toLowerCase() || "";

        }


        return "";

    };




    // ================================
    // FETCH USERS
    // ================================

    const fetchUsers = () => {


        setLoading(true);


        fetch(
            "http://localhost:8080/users",
            {

                headers: {

                    Authorization:
                    `Bearer ${localStorage.getItem("token")}`

                }

            }

        )


        .then((response)=>{


            if(!response.ok){

                throw new Error(
                    "Failed to fetch users"
                );

            }


            return response.json();


        })


        .then((data)=>{


            if(Array.isArray(data)){

                setUsers(data);

            }


            else if(data.content){

                setUsers(data.content);

            }


            else{

                setUsers([]);

            }


            setLoading(false);


        })


        .catch((error)=>{


            console.error(
                "Error fetching users:",
                error
            );


            setError(
                "Unable to load users"
            );


            setLoading(false);


        });


    };




    useEffect(()=>{

        fetchUsers();

    },[]);






    // ================================
    // EDIT USER
    // ================================

    const handleEdit = async (user)=>{


        const newUsername = window.prompt(

            "Enter new username:",

            user.username

        );



        if(
            newUsername === null ||
            newUsername.trim() === ""
        ){

            return;

        }





        const updatedUser = {


            username:
            newUsername.trim(),


            password:
            user.password,


            role:
            user.role,


            status:
            user.status


        };




        try{


            const response = await fetch(

                `http://localhost:8080/users/${user.id}`,

                {


                    method:"PUT",


                    headers:{


                        "Content-Type":
                        "application/json",


                        Authorization:
                        `Bearer ${localStorage.getItem("token")}`


                    },


                    body:
                    JSON.stringify(updatedUser)


                }

            );




            if(!response.ok){


                throw new Error(
                    "Update failed"
                );


            }





            alert(
                "User updated successfully"
            );


            fetchUsers();



        }


        catch(error){


            console.error(
                "Edit error:",
                error
            );


            alert(
                "Unable to update user"
            );


        }


    };








    // ================================
    // DELETE USER
    // ================================


    const handleDelete = async(id)=>{


        const confirmDelete =
        window.confirm(
             "Are you sure you want to delete this user?"
        );



        if(!confirmDelete){

            return;

        }




        try{


            const response = await fetch(


                `http://localhost:8080/users/${id}`,


                {


                    method:"DELETE",


                    headers:{


                        Authorization:
                        `Bearer ${localStorage.getItem("token")}`


                    }


                }


            );




            if(!response.ok){


                throw new Error(
                    "Delete failed"
                );


            }





            setUsers(

                users.filter(

                    (user)=>

                    user.id !== id

                )

            );



            alert(
                "User deleted successfully"
            );


        }



        catch(error){


            console.error(
                "Delete error:",
                error
            );


            alert(
                "Unable to delete user"
            );


        }


    };






    // ONLY ADMIN USERS

    const adminUsers = users.filter(

        (user)=>

        getRoleName(user.role)==="admin"

    );






    return (

        <div className="users-page">



            <div className="users-header">


                <div>


                    <p className="users-label">

                        USER MANAGEMENT

                    </p>


                    <h1>

                        Registered Admins

                    </h1>


                    <p>

                        Manage administrator accounts
                        and their access.

                    </p>


                </div>



                <div className="users-count">

                    {adminUsers.length} Admins

                </div>



            </div>






            <div className="users-table-card">



                {loading && (

                    <p className="message">

                        Loading users...

                    </p>

                )}



                {error && (

                    <p className="error-message">

                        {error}

                    </p>

                )}






                {!loading && !error && (


                    <table className="users-table">


                        <thead>

                            <tr>

                                <th>ID</th>

                                <th>Username</th>

                                <th>Role</th>

                                <th>Status</th>

                                <th>Actions</th>


                            </tr>


                        </thead>





                        <tbody>



                        {

                        adminUsers.length > 0 ? (


                            adminUsers.map((user)=>(


                                <tr key={user.id}>


                                    <td>

                                        {user.id}

                                    </td>




                                    <td className="username-cell">


                                        <div className="user-avatar">


                                            {
                                            user.username
                                            ?.charAt(0)
                                            .toUpperCase()
                                            }


                                        </div>


                                        <span>

                                            {user.username}

                                        </span>



                                    </td>





                                    <td>


                                        <span className="role-badge">

                                            {
                                            getRoleName(
                                                user.role
                                            )
                                            }


                                        </span>


                                    </td>





                                    <td>


                                        <span className="status-badge">


                                            {
                                            user.status ||
                                            "ACTIVE"
                                            }


                                        </span>


                                    </td>





                                    <td>


                                        <button

                                        className="edit-btn"

                                        onClick={()=>
                                            handleEdit(user)
                                        }

                                        >

                                            Edit

                                        </button>





                                        <button

                                        className="delete-btn"

                                        onClick={()=>
                                            handleDelete(user.id)
                                        }

                                        >

                                            Delete

                                        </button>



                                    </td>



                                </tr>


                            ))


                        )

                        :

                        (

                            <tr>


                                <td colSpan="5"
                                className="no-users">


                                    No admin users found


                                </td>


                            </tr>


                        )


                        }




                        </tbody>


                    </table>


                )}



            </div>



        </div>

    );


}


export default Users;