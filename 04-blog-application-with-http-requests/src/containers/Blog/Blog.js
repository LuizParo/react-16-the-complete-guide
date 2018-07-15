import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';

import './Blog.css';

import FullPost from './FullPost/FullPost';
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
                                <NavLink to="/"
                                    exact
                                    activeClassName="my-active"
                                    activeStyle={{
                                        color : '#fa923f',
                                        textDecoration : 'underline'
                                    }} >
                                    Home
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

                <Route path="/" exact component={Posts} />
                <Route path="/new-post" component={NewPost} />
                <Route path="/:id" exact component={FullPost} />
            </div>
        );
    }
}

export default Blog;