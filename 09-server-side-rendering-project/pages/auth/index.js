import React from 'react';

import User from '../../components/User';

const Index = props => (
    <div>
        <h1>The Auth Index Page - {props.appName}</h1>
        <User name="Max" age={28} />
    </div>
);

Index.getInitialProps = context => {
    console.log('[pages/auth/Index.js] getInitialProps', context);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ appName : 'Super App (Auth)' });
        }, 1000);
    });
};

export default Index;