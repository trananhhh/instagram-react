import React from 'react';
import './Profile.css';
import { useParams } from 'react-router-dom';

const Profile = () => {
    const { username } = useParams();
    const userAvatar = null;
    const userDisplayName = '';
    const userBio = '';
    return (
        <div className="container profile-container">
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
                        <button className="edit-profile-btn">
                            Edit profile
                        </button>
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
            <div className="grid profile__gallery">
                <div className="grid-items profile__gallery-items">
                    <img src="https://picsum.photos/300" alt="pics" />
                    <div className="profile__gallery-items--overlay">
                        <i class="bx bxs-heart"></i>
                        <span>12</span>
                        <span className="spacer"></span>
                        <i class="bx bxs-message-square-minus"></i>
                        <span>9</span>
                    </div>
                </div>
                <div className="grid-items profile__gallery-items">
                    <img src="https://picsum.photos/300" alt="pics" />
                </div>
                <div className="grid-items profile__gallery-items">
                    <img src="https://picsum.photos/300" alt="pics" />
                </div>
                <div className="grid-items profile__gallery-items">
                    <img src="https://picsum.photos/300" alt="pics" />
                </div>
                <div className="grid-items profile__gallery-items">
                    <img src="https://picsum.photos/300" alt="pics" />
                </div>
                <div className="grid-items-3 profile__gallery-items">
                    <img src="https://picsum.photos/300" alt="pics" />
                </div>
                <div className="grid-items-3 profile__gallery-items">
                    <img src="https://picsum.photos/300" alt="pics" />
                </div>
            </div>
        </div>
    );
};

export default Profile;
