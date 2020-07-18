import React, {useContext, useEffect} from "react";
import GithubContext from "../../context/github/githubContext";
import Spinner from "../layout/Spinner";
import UserItems from "./UserItems";

const Users = () => {
    const githubContext = useContext(GithubContext);
    const {loading, users} = githubContext;

    useEffect(() => {
        githubContext.getAllUsers();
        // eslint-disable-next-line
    }, []);

    if (loading) {
        return <Spinner />;
    } else {
        return (
            <div style={userStyle}>
                {users.map(user => (
                    <UserItems key={user.id} user={user} />
                ))}
            </div>
        );
    }
};

const userStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gridGap: "1rem"
};

export default Users;
