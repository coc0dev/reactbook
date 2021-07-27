import { PostList } from '../components/PostList'
import React, { useContext } from 'react'
import { useAuth } from '../contexts/AuthContext'
import firebase from '../firebase'
import { DataContext } from '../contexts/DataProvider'

export const Home = (props) => {
    const {currentUser} = useAuth();
    const { postList, getPosts } = useContext(DataContext)
    // const [ setPosts ] = postList;

    const addPost = (e) => {
        e.preventDefault();
        
        const formData = {
            body: e.target.body.value,
            dateCreated: firebase.firestore.Timestamp.fromDate(new Date()),
            dateUpdated: null,
            userId: currentUser.id,
        }
        firebase.firestore().collection('posts').add(formData)
        // In the db, the posts are alread supplied. This is where we will re-render/update our list of posts in the DOM
            .then((docRef) => { 
                getPosts(); 
                console.log('new post created');
            })
            .catch(err => console.err(err))
        
            // console.log(formData)
        }
    return (
        <div>
                <h3>Home</h3>
                <hr />
​
                <form onSubmit={(e) => addPost(e)} action="" method="POST">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-10">
                                <input className="form-control" type="text" name='body' placeholder="Your blog post here..." />
                            </div>
                            <div className="col-md-2">
                                <input className="btn btn-info btn-block" type="submit" value="Post" />
                            </div>
                        </div>
                    </div>
                </form>
​
                <hr />
​
                <PostList posts={postList[0]} />
            </div>
    )
}
