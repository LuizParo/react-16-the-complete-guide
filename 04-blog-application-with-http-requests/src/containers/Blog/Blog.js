import React, { Component } from 'react';
import axios from '../../axios';

import Post from '../../components/Post/Post';

import './Blog.css';

class Blog extends Component {
    state = {
        posts : [],
        selectedPostId : null,
        error : false
    }

    componentDidMount() {
        axios.get('/posts')
            .then(response => response.data.slice(0, 4))
            .then(posts => posts.map(post => ({ ...post, author : 'Max' })))
            .then(updatedPosts => this.setState({ posts : updatedPosts }))
            .catch(error => this.setState({ error : true }));
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

    render () {
        let posts = <p style={{ textAlign : 'center' }}>Something went wrong!</p>;
        
        if (!this.state.error) {
            posts = this.state.posts.map(this._createPost);
        }

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/new-post">New Post</a></li>
                        </ul>
                    </nav>
                </header>
                <section className="Posts">
                    {posts}
                </section>
            </div>
        );
    }
}

export default Blog;