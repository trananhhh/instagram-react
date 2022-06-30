import React, { useState } from 'react';
import './Header.css';

export const Header = (props) => {
    // const [openStatus, setOpenStatus] = useState(false);

    const handleSignUp = () => {
        props.signUpOnClick(true);
    };

    const handleLogout = () => {
        props.logOutOnClick(true);
    };

    const handleLogIn = () => {
        props.logInOnClick(true);
    };

    const handleUpload = () => {
        props.uploadOnClick(true);
    };

    return (
        <div className="container">
            <div className="header">
                <div className="header__logo">
                    <img
                        src="https://www.instagram.com/static/images/web/logged_out_wordmark-2x.png/d2529dbef8ed.png"
                        alt="Logo"
                    />
                </div>
                <div className="header__search">
                    <input type="text" placeholder="Search" />
                    <i className="bx bx-search-alt-2"></i>
                </div>
                {/* <div className="header__features">
                    <div className="header__feature--icon"></div>
                </div> */}
                <div className="header__profile-nav">
                    {props.user ? (
                        <div className="header__profile">
                            <div className="nav-icons" onClick={handleUpload}>
                                <i className="bx bx-message-square-add"></i>
                            </div>
                            <p className="user__name">
                                {props.user.displayName}
                            </p>
                            <button className="btn" onClick={handleLogout}>
                                Sign out
                            </button>
                        </div>
                    ) : (
                        <>
                            <button className="btn " onClick={handleLogIn}>
                                Login
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={handleSignUp}
                            >
                                Sign up
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
