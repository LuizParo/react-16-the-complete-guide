import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts : [],
        selectedPostId : null
    }

    componentDidMount() {
        axios.get('http://jsonplaceholder.typicode.com/posts')
            .then(response => response.data.slice(0, 4))
            .then(posts => posts.map(post => ({ ...post, author : 'Max' })))
            .then(updatedPosts => this.setState({ posts : updatedPosts }));
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
        const posts = this.state.posts
            .map(this._createPost);

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;