import {base_url} from "../utils/constants";

export const PENDING = 'PENDING';
export const ERROR = 'ERROR';
export const SHOW_COMMITS = 'SHOW_COMMITS';
export const FILL_BRANCHES = 'FILL_BRANCHES';
export const FILL_FILTERED_COMMIT = 'FILL_FILTERED_COMMIT';

export const pending = () => ({
    type: PENDING
});

export const error = errorType => ({
    type: ERROR,
    payload: errorType
});

export const showCommitsAction = (commits, header) => ({
    type: SHOW_COMMITS,
    payload: commits,
    header
});

export const fillBranchesListAction = branches => ({
    type: FILL_BRANCHES,
    payload: branches
});

export const fillFilteredCommits = name => ({
    type: FILL_FILTERED_COMMIT,
    payload: name
});

export const requestCommit = (owner, repo, branch, perPage, page) => {
    return (dispatch) => {
        dispatch(pending());
        fetch(`${base_url}/repos/${owner.trim()}/${repo.trim()}/commits?sha=${branch.trim()}&per_page=${perPage}&page=${page}`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.statusText);
                }
            })
            .then(body => {
                return body.map(item => ({
                    sha: item.sha,
                    author: item.commit.author,
                    contributor: item.commit.committer,
                    message: item.commit.message
                }))
            })
            .then(
                data => {
                    dispatch(showCommitsAction(data, {
                        owner, repo, branch
                    }))
                }
            )
            .catch(e => dispatch(error(e.message)));
    }
}

export const getBranches = (owner, repo) => {
    return (dispatch) => {
        dispatch(pending());
        fetch(`${base_url}/repos/${owner.trim()}/${repo.trim()}/branches`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.statusText);
                }
            })
            .then(data => {
                return data.map(item => (item.name))
            })
            .then(branches => dispatch(fillBranchesListAction(branches)))
            .catch(e => dispatch(error(e.message)));
    }
}

