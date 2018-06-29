import React from 'react';

export default props => {
    return (
        <input type="text" onChange={props.usernameChangeHandler} value={props.username} />
    );
}