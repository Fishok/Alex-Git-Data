import React from 'react';
import style from '../modules/commit.module.css'

const Commit = ({commit:{author, contributor, message, sha}}) => {
    return (
        <div className={style.border}>
            <div>
                <div>
                    Author:
                    <p>name: {author.name}</p>
                    <p>email: {author.email}</p>
                    <p>date: {author.date}</p>
                </div>
                <div>
                    Contributor:
                    <p>name: {contributor.name}</p>
                    <p>email: {contributor.email}</p>
                    <p>date: {contributor.date}</p>
                </div>
                <div>
                    <p>SHA: {sha}</p>
                </div>
                <div>
                    <p>message: {message}</p>
                </div>
            </div>
        </div>
    );
};

export default Commit;