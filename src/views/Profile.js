import { PostList } from '../components/PostList';
import React, {useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import firebase from '../firebase'

export const Profile = () => {
    const db = firebase.firestore()
    const [posts, setPosts] = useState([]);
    const {currentUser} = useAuth();

    useEffect(() => {
        fetch('/api/blog/user')
        .then(res => res.json())
        .then(data => setPosts(data)
        )})

    // componentDidMount() {
    //     fetch('/api/blog/user')
    //     .then(res => res.json())
    //     .then(data => this.setState({ posts: data }))
    // }


    const handleClick = (event) => {
        event.preventDefault();

        const formData = {
            firstName: event.target.first_name.value,
            lastName: event.target.last_name.value,
            email: event.target.email.value,
            bio: event.target.bio.value,
            profileImage: event.target.profile_image.value,
        }
        firebase.firestore().collection('users').doc(currentUser.id).set(formData)
        
            .then((docRef) => {  
                console.log('profile updated.');
            })
            .catch(err => console.error(err))
            event.target.reset()
            console.log(formData)
    }
        return (
            <div>
                <h3>
                    Profile | Welcome User
                </h3>
                <hr />

                <div className="row">
                    <div className="col-md-4">
                        <img className="img-fluid" src="" alt="profile" />
                    </div>
                    <div className="col-md">
                        <form onSubmit={(e) => handleClick(e)} action="" method="POST" encType="multipart/form-data">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="firstName" placeholder="First Name" name="first_name" defaultValue="" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="lastName" placeholder="Last Name" name="last_name" defaultValue="" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <input type="email" className="form-control" placeholder="example@email.com" id="email" name="email" defaultValue="" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <input type="file" id="image" className="form-control-file" name="profile_image" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <textarea className="form-control" name="bio" id="bio" cols="30" rows="10" placeholder="Type bio here"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <input type="submit" id="update" className="btn btn-info btn-block" value="Update Profile" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <hr />

                <div className="row">
                    <div className="col-md-12">
                        <PostList posts={posts}/>
                        
                    </div>
                </div>
            </div>
    )
}

