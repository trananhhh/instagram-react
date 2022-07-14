import React, { useState } from 'react';
import './Profile.css';
import { useParams, useNavigate } from 'react-router-dom';

const Profile = (props) => {
    const navigate = useNavigate();
    const [followed, setFollowed] = useState(props.followed);
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
                        {props.username === username ? (
                            <button className="profiles-btn btn-secondary btn">
                                Edit profile
                            </button>
                        ) : followed ? (
                            <>
                                <button className="profiles-btn btn btn-secondary">
                                    Message
                                </button>
                                <button
                                    className="profiles-btn btn "
                                    onClick={() => setFollowed(false)}
                                >
                                    Unfollow
                                </button>
                            </>
                        ) : (
                            <button
                                className="profiles-btn btn btn-primary"
                                onClick={() => setFollowed(true)}
                            >
                                Follow
                            </button>
                        )}
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
            <div className="profile__gallery">
                <div className="grid-items profile__gallery-items">
                    <div className="dummy"></div>
                    <img src="https://picsum.photos/500/800" alt="pics" />
                    <div className="profile__gallery-items--overlay">
                        <i className="bx bxs-heart"></i>
                        <span>12</span>
                        <span className="spacer"></span>
                        <i className="bx bxs-message-square-minus"></i>
                        <span>9</span>
                    </div>
                </div>
                <div className="grid-items profile__gallery-items">
                    <div className="dummy"></div>
                    <img src="https://picsum.photos/500/900" alt="pics" />
                    <div className="profile__gallery-items--overlay">
                        <i className="bx bxs-heart"></i>
                        <span>12</span>
                        <span className="spacer"></span>
                        <i className="bx bxs-message-square-minus"></i>
                        <span>9</span>
                    </div>
                </div>
                <div className="grid-items profile__gallery-items">
                    <div className="dummy"></div>
                    <img src="https://picsum.photos/1000/900" alt="pics" />
                    <div className="profile__gallery-items--overlay">
                        <i className="bx bxs-heart"></i>
                        <span>12</span>
                        <span className="spacer"></span>
                        <i className="bx bxs-message-square-minus"></i>
                        <span>9</span>
                    </div>
                </div>
                <div className="grid-items profile__gallery-items">
                    <div className="dummy"></div>
                    <img src="https://picsum.photos/800" alt="pics" />
                    <div className="profile__gallery-items--overlay">
                        <i className="bx bxs-heart"></i>
                        <span>12</span>
                        <span className="spacer"></span>
                        <i className="bx bxs-message-square-minus"></i>
                        <span>9</span>
                    </div>
                </div>
                <div className="grid-items profile__gallery-items">
                    <div className="dummy"></div>
                    <img src="https://picsum.photos/900" alt="pics" />
                    <div className="profile__gallery-items--overlay">
                        <i className="bx bxs-heart"></i>
                        <span>12</span>
                        <span className="spacer"></span>
                        <i className="bx bxs-message-square-minus"></i>
                        <span>9</span>
                    </div>
                </div>
                <div className="grid-items profile__gallery-items">
                    <div className="dummy"></div>
                    <img src="https://picsum.photos/700" alt="pics" />
                    <div className="profile__gallery-items--overlay">
                        <i className="bx bxs-heart"></i>
                        <span>12</span>
                        <span className="spacer"></span>
                        <i className="bx bxs-message-square-minus"></i>
                        <span>9</span>
                    </div>
                </div>
                <div className="grid-items profile__gallery-items">
                    <div className="dummy"></div>
                    <img src="https://picsum.photos/500" alt="pics" />
                    <div className="profile__gallery-items--overlay">
                        <i className="bx bxs-heart"></i>
                        <span>12</span>
                        <span className="spacer"></span>
                        <i className="bx bxs-message-square-minus"></i>
                        <span>9</span>
                    </div>
                </div>
                <div className="grid-items profile__gallery-items">
                    <div className="dummy"></div>
                    <img src="https://picsum.photos/200" alt="pics" />
                    <div className="profile__gallery-items--overlay">
                        <i className="bx bxs-heart"></i>
                        <span>12</span>
                        <span className="spacer"></span>
                        <i className="bx bxs-message-square-minus"></i>
                        <span>9</span>
                    </div>
                </div>
                <div className="grid-items profile__gallery-items">
                    <div className="dummy"></div>
                    <img src="https://picsum.photos/300" alt="pics" />
                    <div className="profile__gallery-items--overlay">
                        <i className="bx bxs-heart"></i>
                        <span>12</span>
                        <span className="spacer"></span>
                        <i className="bx bxs-message-square-minus"></i>
                        <span>9</span>
                    </div>
                </div>
                <div className="grid-items profile__gallery-items">
                    <div className="dummy"></div>
                    <img src="https://picsum.photos/900" alt="pics" />
                    <div className="profile__gallery-items--overlay">
                        <i className="bx bxs-heart"></i>
                        <span>12</span>
                        <span className="spacer"></span>
                        <i className="bx bxs-message-square-minus"></i>
                        <span>9</span>
                    </div>
                </div>
                <div className="grid-items profile__gallery-items">
                    <div className="dummy"></div>
                    <img src="https://picsum.photos/900" alt="pics" />
                    <div className="profile__gallery-items--overlay">
                        <i className="bx bxs-heart"></i>
                        <span>12</span>
                        <span className="spacer"></span>
                        <i className="bx bxs-message-square-minus"></i>
                        <span>9</span>
                    </div>
                </div>
                <div className="grid-items profile__gallery-items">
                    <div className="dummy"></div>
                    <img src="https://picsum.photos/900" alt="pics" />
                    <div className="profile__gallery-items--overlay">
                        <i className="bx bxs-heart"></i>
                        <span>12</span>
                        <span className="spacer"></span>
                        <i className="bx bxs-message-square-minus"></i>
                        <span>9</span>
                    </div>
                </div>
            </div>
            <p className="footer secondary-text modal-text">
                ©2022 made by{' '}
                <span
                    className="clickable"
                    onClick={() => navigate('/_trananhhh')}
                >
                    @_trananhhh
                </span>
            </p>
        </div>
    );
};

export default Profile;
