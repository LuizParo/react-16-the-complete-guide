import React, { Component } from 'react';

import Post from '../../../components/Post/Post';

import axios from '../../../axios';

import './Posts.css';

class Posts extends Component {
    state = {
        posts : [],
        selectedPostId : null,
        error : false,
        errorMessage : ''
    }

    componentDidMount() {
        axios.get('/posts')
            .then(response => response.data.slice(0, 4))
            .then(posts => posts.map(post => ({ ...post, author : 'Max' })))
            .then(updatedPosts => this.setState({ posts : updatedPosts }))
            .catch(error => this.setState({ error : true, errorMessage : error.message }));
    }

    postSelectedHandler = id => {
        this.setState({ selectedPostId : id });
    }

    _createPost = post => {
        return <Post key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)} />;
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