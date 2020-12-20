import {ERROR, FILL_BRANCHES, FILL_FILTERED_COMMIT, PENDING, SHOW_COMMITS} from "../actions/commitActions";

export const rootReducer = (state, action) => {
    switch (action.type) {
        case PENDING:
            return {...state, pending: "waiting for response"};
        case ERROR:
            return {...state, pending: action.payload};
        case SHOW_COMMITS:
            return {
                ...state, pending: '', branchList: null, commits: action.payload, filteredCommits: action.payload,
                owner: action.header.owner, repo: action.header.repo, branch: action.header.branch
            };
        case FILL_BRANCHES:
            return {...state, branchList: action.payload};
        case FILL_FILTERED_COMMIT:
            let filteredCommits = state.commits.filter(item => item.author.name.includes(action.payload));
            return {...state, filteredCommits};
        default:
            return state;
    }
}