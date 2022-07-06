import React, { useState } from 'react';
import './Header.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { BrowserRouter as Router, Link } from 'react-router-dom';

export const Header = (props) => {
    // const [openStatus, setOpenStatus] = useState(false);

    const handleSignUp = () => {
        props.signUpOnClick(true);
    };

    const handleLogout = () => {
        handleClose();
        props.logOutOnClick(true);
    };

    const handleLogIn = () => {
        props.logInOnClick(true);
    };

    const handleUpload = () => {
        props.uploadOnClick(true);
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleOpenProfileOptions = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // const handleDeletePost = async () => {
    //     if (window.confirm('Are you sure to delete this post?')) {
    //         await deleteDoc(doc(db, 'Posts', props.postId));
    //         props.handleDeletePost(props.postId);
    //     } else {
    //         handleClose();
    //     }
    // };

    return (
        <div className="header-container">
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
                                {/* <Router> */}
                                <Link to="/" className="nav-icons">
                                    <i className="bx bx-home-alt-2"></i>
                                </Link>
                                <Link to="/direct" className="nav-icons">
                                    <i className="bx bx-message-square-dots"></i>
                                </Link>
                                <div
                                    className="nav-icons"
                                    onClick={handleUpload}
                                >
                                    <i className="bx bx-message-square-add"></i>
                                </div>
                                <Link to="/discovery" className="nav-icons">
                                    <i className="bx bx-compass"></i>
                                </Link>
                                <div className="nav-icons">
                                    <i className="bx bx-notification"></i>
                                </div>
                                <div className="nav-icons">
                                    <i
                                        className="bx bx-user-circle"
                                        onClick={handleOpenProfileOptions}
                                    ></i>
                                </div>
                                <Menu
                                    id="fade-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'fade-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    // TransitionComponent={Fade}
                                >
                                    <MenuItem onClose={handleClose}>
                                        <Link to={`/${props.user.displayName}`}>
                                            <div className="options-icon">
                                                <i className="bx bxs-user-circle"></i>
                                            </div>
                                            Profile
                                        </Link>
                                    </MenuItem>
                                    <MenuItem onClose={handleClose}>
                                        <div className="options-icon">
                                            <i className="bx bxs-bookmark-star"></i>
                                        </div>
                                        Saved
                                    </MenuItem>
                                    <MenuItem
                                        onClick={handleLogout}
                                        className="danger-option"
                                    >
                                        Sign out
                                    </MenuItem>
                                </Menu>
                                {/* </Router> */}
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
        </div>
    );
};

export default Header;
