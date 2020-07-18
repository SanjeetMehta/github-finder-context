import React, {useContext, useState} from "react";
import AlertContext from "../../context/alert/alertContext";
import GithubContext from "../../context/github/githubContext";

const Search = () => {
    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);
    const {clearUsers, users} = githubContext;
    const {setAlert} = alertContext;
    const [text, setText] = useState("");
    const onChange = e => setText(e.target.value);
    const onSubmit = e => {
        e.preventDefault();
        if (text === "") {
            setAlert("Please enter something", "light");
        } else {
            githubContext.searchUsers(text);
            setText("");
        }
    };
    return (
        <div>
            <form onSubmit={onSubmit} className="form">
                <input
                    type="text"
                    name="text"
                    placeholder="Search Users..."
                    value={text}
                    onChange={onChange}
                />
                <input
                    type="submit"
                    value="search"
                    className="btn btn-dark btn-block"
                />
            </form>
            {users.length ? (
                <button
                    className="btn btn-light btn-block"
                    onClick={clearUsers}
                >
                    Clear
                </button>
            ) : (
                ""
            )}
        </div>
    );
};

export default Search;
