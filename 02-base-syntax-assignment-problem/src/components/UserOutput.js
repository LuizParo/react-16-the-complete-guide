import React from 'react';

export default props => {
    return (
        <div>
            <p>{props.username}</p>
            <p>{props.children}</p>
        </div>
    );
}