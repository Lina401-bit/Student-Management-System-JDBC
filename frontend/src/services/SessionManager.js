const SESSION_TIME = 30 * 60 * 1000;
// 30 minutes


export const checkSession = () => {

    const session =
        localStorage.getItem("session");


    if(!session){

        return false;

    }


    const sessionData =
        JSON.parse(session);


    const currentTime =
        new Date().getTime();


    const expiryTime =
        currentTime - sessionData.loginTime;


    if(expiryTime > SESSION_TIME){


        localStorage.removeItem("session");

        localStorage.removeItem("loggedInUser");


        return false;

    }


    return true;

};



export const logout = () => {

    localStorage.removeItem("session");

    localStorage.removeItem("loggedInUser");

};