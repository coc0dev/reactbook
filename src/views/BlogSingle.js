import React, { useCallback, useState, useEffect, useRef } from 'react'
import { Post } from '../components/Post'
import firebase from '../firebase'

export const BlogSingle = (props) => {
    const [post, setPost] = useState({});
    const db = firebase.firestore();
    
    const postState = useRef('LOADING')

    const getPost = useCallback(
        () => {
            db.collection('posts').doc(props.match.params.id).get()
        .then(doc => { postState.current = 'LOADED'; setPost(doc.data())})
        .catch(err => console.error(err))
        },
        [db, props.match.params.id],
    )

    useEffect(() => {
        getPost();
    }, [ getPost ])

    return (
        <React.Fragment>
            {
                postState.current !== 'LOADING'
                ?
                <Post match={props.match} key={post.podtId} post={post} />
                :
                <p>loading...</p>
            }
        </React.Fragment>
    )
}
