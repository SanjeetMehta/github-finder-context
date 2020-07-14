import React, {useReducer} from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
    CLEAR_USERS,
    GET_REPOS,
    GET_USER,
    REMOVE_ALERT,
    SEARCH_USERS,
    SET_ALERT,
    SET_LOADING
} from "../types";
import githubContex from "./githubContext";

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    };

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    // Search github users.
    const searchUsers = async text => {
        setLoading();
        const result = await axios.get(
            `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        dispatch({
            type: SEARCH_USERS,
            payload: result.data.items
        });
    };

    const setLoading = () => dispatch({type: SET_LOADING});

    return (
        <GithubContext.Provider
            value={{
                users: state.users,
                user: state.user,
                repos: state.repos,
                loading: state.loading,
                searchUsers
            }}
        >
            {props.children}
        </GithubContext.Provider>
    );
};

export default GithubState;