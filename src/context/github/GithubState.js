import axios from "axios";
import React, {useReducer} from "react";
import {
    CLEAR_USERS,
    GET_REPOS,
    GET_USER,
    GET_USERS,
    SEARCH_USERS,
    SET_LOADING
} from "../types";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    };

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    //Get all users.
    const getAllUsers = async () => {
        setLoading();
        const result = await axios.get(
            `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        dispatch({
            type: GET_USERS,
            payload: result.data
        });
    };
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

    // Get Single user.
    const getUser = async username => {
        setLoading();
        const result = await axios.get(
            `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        dispatch({
            type: GET_USER,
            payload: result.data
        });
    };

    // Clear users from state.
    const clearUsers = () => {
        dispatch({
            type: CLEAR_USERS
        });
    };

    // Get users repos.
    const getUserRepos = async username => {
        setLoading();
        const result = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        dispatch({
            type: GET_REPOS,
            payload: result.data
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
                searchUsers,
                getAllUsers,
                getUser,
                clearUsers,
                getUserRepos
            }}
        >
            {props.children}
        </GithubContext.Provider>
    );
};

export default GithubState;
