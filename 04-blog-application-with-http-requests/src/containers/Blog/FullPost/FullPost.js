import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost : {},
        errorMessage : ''
    }

    componentDidMount() {
        console.log('[FullPost.js] componentDidUpdate with props: ', this.props);
        this._loadData();
    }

    componentDidUpdate(nextProps) {
        console.log('[FullPost.js] componentDidUpdate with props: ', this.props);

        if (nextProps.match.params.id !== this.props.match.params.id) {
            this._loadData();
        }
    }

    _loadData() {
        const idPost = this.props.match.params.id;
        if (idPost) {
            axios.get(`/posts/${idPost}`)
                .then(response => this.setState({ loadedPost : response.data }))
                .catch(error => this.setState({ errorMessage : error.message }));
        }
    }

    deletePostHandler = () => {
        axios.delete(`/posts/${this.props.match.params.id}`)
            .then(console.log)
            .catch(error => this.setState({ errorMessage : error.message }));
    }

    render () {
        if (this.state.errorMessage) {
            return <p>Something went wrong: {this.state.errorMessage}</p>;
        }

        const { loadedPost } = this.state;

        return (
            <div className="FullPost">
                <h1>{loadedPost.title}</h1>
                <p>{loadedPost.body}</p>
                <div className="Edit">
                    <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                </div>
            </div>
        );
    }
}

export default FullPost;