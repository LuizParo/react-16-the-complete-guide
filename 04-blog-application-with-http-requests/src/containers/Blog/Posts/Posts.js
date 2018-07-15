import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Post from '../../../components/Post/Post';

import axios from '../../../axios';

import './Posts.css';

class Posts extends Component {
    state = {
        posts : [],
        error : false,
        errorMessage : ''
    }

    componentDidMount() {
        console.log('[Posts.js] componentDidMount with props: ', this.props);

        axios.get('/posts')
            .then(response => response.data.slice(0, 4))
            .then(posts => posts.map(post => ({ ...post, author : 'Max' })))
            .then(updatedPosts => this.setState({ posts : updatedPosts }))
            .catch(error => this.setState({ error : true, errorMessage : error.message }));
    }

    _createPost = post => {
        return (
            <Link key={post.id} to={`/${post.id}`}>
                <Post title={post.title}
                    author={post.author} />
            </Link>
        );
    }

    _renderPosts() {
        return this.state.error
            ? <p style={{ textAlign : 'center' }}>Something went wrong: {this.state.errorMessage}</p>
            : this.state.posts.map(this._createPost);
    }

    render() {
        return (
            <section className="Posts">
                {this._renderPosts()}
            </section>
        );
    }
}

export default Posts;