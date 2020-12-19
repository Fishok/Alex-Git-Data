import React from 'react';

const Commit = ({commit:{author, contributor, message, sha}}) => {
    return (
        <div>
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