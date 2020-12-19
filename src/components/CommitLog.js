import React, {useEffect} from 'react';
import Commit from "./Commit";
import {connect} from "react-redux";
import InfiniteScroll from 'react-infinite-scroller';
import {bindActionCreators} from "redux";
import {requestCommit} from "../actions/commitActions";


let perPage = 10;

const CommitLog = (props) => {

    useEffect(() => {
        perPage = 10;
    }, []);

    const loadFunc = () => {
        perPage += 10;
        props.requestCommit(props.owner, props.repo, props.branch, perPage, 1);
    }
    return (
        <div>
            {props.commits && (<div>
                <h2>Repository: {props.repo}</h2>
                <h3>Owner: {props.owner}</h3>
                <h4>Branch: {props.branch || 'master'}</h4>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={loadFunc}
                    hasMore={true || false}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                >
                    {props.commits.map(item => (
                        <Commit key={item.sha} commit={item}/>
                    ))}
                </InfiniteScroll>

            </div>)}
        </div>
    );
};

const mapStateToProps = state => ({
    commits: state.filteredCommits,
    repo: state.repo,
    owner: state.owner,
    branch: state.branch
})
const mapDispatchToProps = dispatch => {
    return bindActionCreators({requestCommit}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CommitLog);