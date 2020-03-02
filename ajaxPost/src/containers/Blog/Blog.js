import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';


import './Blog.css';
import Posts from './Posts/Posts';
// import NewPost from './NewPost/NewPost';
import AsyncComponent from '../../hoc/AsyncComponent';
const AsyncNewPost = AsyncComponent(() => import('./NewPost/NewPost'))

class Blog extends Component {
    state = {
        isAuth: true
    }

    render() {
        return (
            <div className={"Blog"}>
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                to="/posts"
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color: "red"
                                }}>Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#idToJumpTo',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path="/posts" component={Posts} />
                    {this.state.isAuth ? <Route path="/new-post" component={AsyncNewPost} /> : null}
                    {/* <Route render={() => <h1>Not Found</h1>} /> */}
                    <Redirect from="/" to="/posts" />
                </Switch>
            </div>
        );
    }
}

export default Blog;