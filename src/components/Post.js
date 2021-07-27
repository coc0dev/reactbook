import React from 'react'
import moment from 'moment'
import firebase from '../firebase'
import { Link } from 'react-router-dom';

export const Post = (props) => {
    const db = firebase.firestore();
    

    return (
        <li className="list-group-item">
            <p>
                {
                    !props.match
                    ?
                        (<Link to={`/blog/${props.post.postId}`}>{props.post.body}</Link>)
                    :
                        props.post.body
                }
            </p>
            <div>
                <span>
                    <cite>&mdash; {props.post.userId}</cite>
                    <small className="float-right">{moment(props.post.dateCreated.toDate()).fromNow()}</small>
                </span>
            </div>
        </li>
    )
}