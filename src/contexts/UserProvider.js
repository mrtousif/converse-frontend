import React from "react";
import { useStorageState } from "react-storage-hooks";
// import ky from "ky";

const UserContext = React.createContext(null);

function UserProvider(props) {
    const [user, setUser, writeError] = useStorageState(
        localStorage,
        "user",
        {}
    );

    if (writeError) {
        console.log(writeError);
    }

    const logOutUser = () => {
        setUser({});
    };

    //JSON.parse(localStorage.getItem("user"))
    // const getUser = async () => {
    //     const userData = await ky
    //         .post("/users/login", {
    //             credentials: "include",
    //             json: {
    //                 email: "tousif2@tousif.com",
    //                 password: "password",
    //             },
    //         })
    //         .json();

    //     setUser(userData);
    //     //localStorage.setItem("user", JSON.stringify(userData));
    // };

    return (
        <UserContext.Provider
            value={{ ...user.user, token: user.token, logOutUser }}
        >
            {props.children}
        </UserContext.Provider>
    );
}

UserProvider.context = UserContext;

export default UserProvider;
