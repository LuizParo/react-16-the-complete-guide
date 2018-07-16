import React, { Component } from 'react';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';

import './Blog.css';

import NewPost from './NewPost/NewPost';
import Posts from './Posts/Posts';

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
                    <Route path="/new-post" component={NewPost} />
                    <Route path="/posts" component={Posts} />
                    <Redirect from="/" to="/posts" />
                </Switch>
            </div>
        );
    }
}

export default Blog;