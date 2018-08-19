import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';

class Index extends Component {

    // Lifecycle hook from nextjs. Excuted on the server alone (not displayed in the browser).
    static getInitialProps(context) {
        console.log('[pages/Index.js] getInitialProps', context);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ appName : 'Super App' });
            }, 1000);
        });
    }

    render() {
        return (
            <div>
                <h1>The Main Page of {this.props.appName}</h1>
                <p>Go to <Link href="/auth"><a>Auth</a></Link></p>
                <button onClick={() => Router.push('/auth')}>Go to Auth</button>
            </div>
        );
    }
}

export default Index;