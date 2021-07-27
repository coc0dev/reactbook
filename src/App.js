import {Main} from './views/Main'
import React, {useEffect, useState, useCallback} from 'react'
import firebase from './firebase'
import {useAuth} from './contexts/AuthContext'

export const App = () => {
  const [posts, setPosts] = useState([])
  const db = firebase.firestore()
  const {signIn} = useAuth();
  
  // const getPosts = () => {
    // let newPosts = []

    // db.collection('posts').get().then(ourPosts => {
    //   ourPosts.forEach(post => {
    //     newPosts.push({...post.data(), postId: post.id})
    //     console.log(post.id)
    //     console.log(post.data())
    //   })
    //   setPosts(newPosts)
    // })

      // pulling data from flask api
      // fetch('/api/blog')
      //     .then(res => res.json())
      //     .then(data => {
      //       setPosts(data)
      //     })
      // fetch('./posts.json')
      // .then(res => res.json())
      // .then(data => {
      //   this.setState({
      //     posts: data
      //   })
      // })
  // }
  
  const getPosts = useCallback(() => {
    let newPosts = []

    db.collection('posts').get().then(ourPosts => {
      ourPosts.forEach(post => {
        newPosts.push({...post.data(), postId: post.id})
        // console.log(post.id)
        // console.log(post.data())
      })
      setPosts(newPosts)
    })
  }, [db]); 

  useEffect(() => {
    getPosts();
  }, [getPosts]);
    
  return (
      <div>
        <Main signIn={signIn} posts={posts} />
      </div>

    )
}
