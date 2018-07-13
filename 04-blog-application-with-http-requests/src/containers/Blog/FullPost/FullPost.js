import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost : {}
    }

    componentDidUpdate(prevProps) {
        if (this.props.id && prevProps.id !== this.props.id) {
            axios.get(`/posts/${this.props.id}`)
                .then(response => this.setState({ loadedPost : response.data }));
        }
    }

    deletePostHandler = () => {
        axios.delete(`/posts/${this.props.id}`)
            .then(console.log);
    }

    render () {
        let post = <p style={{ textAlign : 'center' }}>Please select a Post!</p>;

        if (!this.props.id) {
            return post;
        }

        const { loadedPost } = this.state;
        post = (
            <div className="FullPost">
                <h1>{loadedPost.title}</h1>
                <p>{loadedPost.body}</p>
                <div className="Edit">
                    <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                </div>
            </div>

        );
        return post;
    }
}

export default FullPost;