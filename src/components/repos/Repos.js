import PropTypes from "prop-types";
import React, {useContext} from "react";
import GithubContext from "../../context/github/githubContext";
import RepoItem from "./RepoItem";
const Repos = () => {
    const githubContext = useContext(GithubContext);
    const {repos} = githubContext;
    return repos.map(repo => <RepoItem repo={repo} key={repo.id} />);
};

Repos.protoTypes = {
    repos: PropTypes.array.isRequired
};

export default Repos;
