import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost : {}
    }

    componentDidUpdate(prevProps) {
        if (this.props.id && prevProps.id !== this.props.id) {
            axios.get(`http://jsonplaceholder.typicode.com/posts/${this.props.id}`)
                .then(response => this.setState({ loadedPost : response.data }));
        }
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
                    <button className="Delete">Delete</button>
                </div>
            </div>

        );
        return post;
    }
}

export default FullPost;