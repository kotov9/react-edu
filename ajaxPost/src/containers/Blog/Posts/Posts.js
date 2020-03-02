import React, { Component } from 'react';
import Post from '../../../components/Post/Post';
import axios from '../../../axios';
import './Posts.css';
import FullPost from '../FullPost/FullPost';
import { Route } from 'react-router-dom';


class Posts extends Component {
    state = {
        posts: [],
    }

    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 5);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Biba'
                    }
                })
                this.setState({ posts: updatedPosts })
            })
            .catch(error => console.log(error));

        console.log(this.props);
    }


    postSelectedHandler = id => {
        this.props.history.push({ pathname: '/posts/' + id })
    }


    render() {
        let posts = <p style={{ textAlign: 'center' }}>Something went wrong...</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)} />
                )
            })
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} component={FullPost} />
            </div>
        );
    }
}

export default Posts;