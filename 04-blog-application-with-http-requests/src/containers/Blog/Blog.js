import React, { Component } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';

import './Blog.css';

import Posts from './Posts/Posts';

import asyncComponent from '../../hoc/asyncComponent';

const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});

class Blog extends Component {

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li>
                                <NavLink to="/posts"
                                    exact
                                    activeClassName="my-active"
                                    activeStyle={{
                                        color : '#fa923f',
                                        textDecoration : 'underline'
                                    }} >
                                    Posts
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={{
                                    pathname : '/new-post',
                                    hash : '#submit',
                                    search : '?quicksubmit=true'
                                }}>
                                    New Post
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>

                <Switch>
                    <Route path="/new-post" component={AsyncNewPost} />
                    <Route path="/posts" component={Posts} />
                    <Route render={() => <h1>Not found</h1>} />
                    {/* <Redirect from="/" to="/posts" /> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;