import React from 'react';

const User = props => (
    <div>
        <h1>{props.name}</h1>
        <p>Age: {props.age}</p>
    </div>
);

export default User;