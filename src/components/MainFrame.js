import React, {useState} from 'react';
import CommitLog from "./CommitLog";
import CommitHeatmap from "./CommitHeatmap";
import {bindActionCreators} from "redux";
import {fillFilteredCommits, getBranches, requestCommit} from "../actions/commitActions";
import {connect} from "react-redux";


const MainFrame = (props) => {
    const [owner, setOwner] = useState('');
    const [repo, setRepo] = useState('');
    const [branch, setBranch] = useState('');
    const [isFilterActive, setFilterActive] = useState(false);


    const handleClickGetReset = () => {
        setOwner('');
        setRepo('');
        setBranch('');
    }

    const handleClickGetCommits = () => {
        props.requestCommit(owner, repo, branch, 10, 1);
        handleClickGetReset();
    }

    const handleFilterChange = (name) => {
        props.fillFilteredCommits(name);
    }


    return (
        <>
            <div className='d-flex justify-content-center'>
                <label>
                    Owner name
                    <input onChange={e => setOwner(e.target.value)}
                           type='text'
                           value={owner}/>
                </label>
                <label>
                    Repository name
                    <input onChange={e => setRepo(e.target.value)}
                           type='text'
                           value={repo}/>
                </label>
                <button onClick={() => props.getBranches(owner, repo)}>Get branches</button>
                <label>
                    Branch name
                    {props.branchList ? (<select onChange={e => setBranch(e.currentTarget.value)}>{
                        props.branchList.map(item => (
                            <option value={item} key={item}>{item}</option>
                        ))
                    }</select>) : (<input onChange={e => setBranch(e.target.value)}
                                          type='text'
                                          value={branch}/>)}
                </label>
                <button onClick={handleClickGetCommits}>Get commits</button>
            </div>
            <label>
                Filter by author name
                <input onChange={e => handleFilterChange(e.target.value)}
                       type='text'
                       disabled={!isFilterActive}/>
            </label>
            <label>
                Filter on
                <input onChange={() => setFilterActive(!isFilterActive)} type='checkbox'/>
            </label>
            <div className='row'>
                <div className='col-6'>
                    <CommitLog/>
                </div>
                <div className='col-6'>
                    <CommitHeatmap/>
                </div>
            </div>
        </>
    );
};
const mapStateToProps = state => ({
    branchList: state.branchList
})


const mapDispatchToProps = dispatch => {
    return bindActionCreators({requestCommit, getBranches, fillFilteredCommits}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainFrame);