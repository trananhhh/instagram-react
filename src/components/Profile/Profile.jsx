import React from 'react';
import './Profile.css';
import { useParams } from 'react-router-dom';

const Profile = () => {
    const { username } = useParams();
    const userAvatar = null;
    const userDisplayName = '';
    const userBio = '';
    return (
        <div className="container">
            <div className="profile__header">
                <div className="profile__avatar">
                    {userAvatar ? (
                        <img src={userAvatar} alt="avatar" />
                    ) : (
                        <i className="bx bxs-user-circle"></i>
                    )}
                </div>
                <div className="profile__bio">
                    <div className="row profile__title">
                        <p className="profile__username">{username}</p>
                        <button className="edit-profile-btn">Edit profile</button>
                    </div>
                    <div className="row profile__statics">
                        <p className="profile__static">
                            <span>18</span>
                            posts
                        </p>
                        <p className="profile__static">
                            <span>1,110</span>
                            follower
                        </p>
                        <p className="profile__static">
                            <span>1,559</span>
                            following
                        </p>
                    </div>
                    <div className="row">{userDisplayName}</div>
                    <div className="row">{userBio}</div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
