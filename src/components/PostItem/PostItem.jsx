import React, { useState, useEffect, useRef } from 'react';
import { Avatar } from '@mui/material';
import 'animate.css';

import './PostItem.css';
import { db } from '../../firebaseConfig';
import moment from 'moment';
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
} from 'firebase/firestore';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { EmojiButton } from '@joeattardi/emoji-button';

const PostItem = (props) => {
    // console.log(props.postId);
    const postData = props.data;
    const navigate = useNavigate();
    const picker = new EmojiButton({
        position: 'bottom-end',
        autoHide: false,
        showPreview: false,
        showSearch: false,
        showCategoryButtons: false,
    });
    const trigger = document.querySelector(`.emoji-${props.postId}`);
    const [commentList, setCommentList] = useState([]);

    const [comment, setComment] = useState('');
    const [likeList, setLikeList] = useState([]);
    const [likeStatus, setLikeStatus] = useState(false);
    const [saveStatus, setSaveStatus] = useState(false);
    const [cmtRenderList, setCmtRenderList] = useState([]);
    const [viewAllCmts, setViewAllCmts] = useState(false);
    const [heartAnimation, setHeartAnimation] = useState(false);
    const [showMoreCapsBtn, setShowMoreCapsBtn] = useState(true);
    const [renderCaption, setRenderCaption] = useState('');
    const cmtRef = useRef(null);

    picker.on('emoji', (selection) => {
        setComment((e) => e + selection.emoji);
    });

    useEffect(() => {
        if (postData.caption && postData.caption.length > 100) {
            setShowMoreCapsBtn(true);
            setRenderCaption(postData.caption.substring(0, 100));
        } else {
            setShowMoreCapsBtn(false);
            setRenderCaption(postData.caption);
        }
    }, [postData.caption]);

    const handleShowMoreCaps = () => {
        setShowMoreCapsBtn(false);
        setRenderCaption(postData.caption);
    };

    const getComments = async (postId) => {
        const cmtCol = collection(db, `Posts/${postId}/comments`);
        const snapshot = await getDocs(cmtCol);
        setCommentList(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))
        );
    };

    const getLikes = async (postId) => {
        const likeCol = collection(db, `Posts/${postId}/likes`);
        const snapshot = await getDocs(likeCol);
        let tmpList;
        setLikeList(
            (tmpList = snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            })))
        );
        if (
            tmpList.filter((e) => e.data.userName === props.username).length > 0
        )
            setLikeStatus(true);
    };

    useEffect(() => {
        getComments(props.postId);
        getLikes(props.postId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.postId, props.username]);

    const handleCommentPost = () => {
        if (props.username === '' && !props.username) {
            props.handleRequireLogin(true);
            return;
        }
        if (comment === '' || comment === undefined) return;
        try {
            addDoc(collection(db, `Posts/${props.postId}/comments`), {
                content: comment,
                userName: props.username,
                dateCreated: new Date(),
            }).then(() => {
                getComments(props.postId);
                setComment('');
                setViewAllCmts(false);
                props.commentOnClick(true);
            });
            // console.log('Document written with ID: ', docRef.id);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    const handleSavePost = () => {
        if (props.username === '' && !props.username) {
            props.handleRequireLogin(true);
            return;
        }
        setSaveStatus((s) => !s);
    };

    const handleLikePost = () => {
        if (props.username === '' && !props.username) {
            props.handleRequireLogin(true);
            return;
        }
        setLikeStatus((s) => !s);
        try {
            if (!likeStatus)
                addDoc(collection(db, `Posts/${props.postId}/likes`), {
                    userName: props.username,
                    dateCreated: new Date(),
                });
            else {
                const likeRef = likeList.find(
                    (e) => e.data.userName === props.username
                ).id;
                console.log(likeRef);
                deleteDoc(doc(db, `Posts/${props.postId}/likes`, likeRef));
            }
            // console.log('Document written with ID: ', docRef.id);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
        getLikes(props.postId);
    };

    useEffect(() => {
        setCmtRenderList(
            commentList.length >= 2
                ? commentList
                    .sort((cmt1, cmt2) => {
                        return cmt1.data.dateCreated - cmt2.data.dateCreated;
                    })
                    .slice(0, 2)
                : commentList.slice(0, 2)
        );
    }, [commentList]);

    const handleFocusCmtInput = () => {
        cmtRef.current.focus();
    };

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            handleCommentPost();
        }
    };

    useEffect(() => {
        const func = setTimeout(() => {
            setHeartAnimation(false);
        }, 1500);
        return () => clearTimeout(func);
    }, [heartAnimation]);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleOpenOptions = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeletePost = async () => {
        if (window.confirm('Are you sure to delete this post?')) {
            await deleteDoc(doc(db, 'Posts', props.postId));
            props.handleDeletePost(props.postId);
        } else {
            handleClose();
        }
    };

    return (
        <div className="post__container">
            {/* Header */}
            <div className="post__header row">
                <div
                    className="user row clickable"
                    onClick={() => navigate('/' + postData.userName)}
                >
                    <Avatar
                        className="user__ava"
                        alt={postData.userName}
                        src="/static/images/avatar/1.jpg"
                    />
                    <p className="user__name">{postData.userName}</p>
                </div>
                <div className="post__header-options action__icon">
                    <i
                        className="bx bx-dots-horizontal-rounded clickable"
                        onClick={handleOpenOptions}
                    ></i>
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
                        {postData.userName === props.username ? (
                            <MenuItem
                                onClick={handleDeletePost}
                                className="danger-option clickable"
                            >
                                Delete
                            </MenuItem>
                        ) : (
                            ''
                        )}
                    </Menu>
                </div>
            </div>
            {/* Main post */}
            <div
                className="post__media"
                onDoubleClick={() => {
                    if (props.username !== '' && props.username) {
                        if (!likeStatus) handleLikePost();
                        setLikeStatus(true);
                        setHeartAnimation(true);
                    } else {
                        props.handleRequireLogin(true);
                    }
                }}
            >
                {postData.mediaUrl ? (
                    <img
                        alt="#"
                        className="main-media"
                        src={postData.mediaUrl}
                    />
                ) : postData.mediaUrls.length === 1 ? (
                    <img
                        alt="#"
                        className="main-media"
                        src={postData.mediaUrls[0]}
                    />
                ) : (
                    <Swiper
                        navigation={true}
                        pagination={{ clickable: true }}
                        modules={[Pagination, Navigation]}
                        className="mySwiper"
                    >
                        {postData.mediaUrls.map((img, i) => (
                            <SwiperSlide className="slideImage" key={i}>
                                <img src={img} alt="images" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
                {heartAnimation ? (
                    <div className="main-heart">
                        <img
                            alt=""
                            className="animate__animated animate__tada"
                            src={
                                process.env.PUBLIC_URL +
                                '/assets/icons/heart.png'
                            }
                        />
                    </div>
                ) : (
                    ''
                )}
            </div>
            {/* Below */}
            <div className="post__below-container">
                {/* Interaction */}
                <div className="row interaction-row">
                    <div className="row interaction-group">
                        <div
                            className="action__icon clickable"
                            onClick={handleLikePost}
                        >
                            {likeStatus ? (
                                <i className="bx bxs-heart icon-animation"></i>
                            ) : (
                                <i className="bx bx-heart"></i>
                            )}
                        </div>
                        <div
                            className="action__icon"
                            onClick={handleFocusCmtInput}
                        >
                            <i className="bx bx-message-square-minus"></i>
                        </div>
                        <div className="action__icon">
                            <i className="bx bx-paper-plane"></i>
                        </div>
                    </div>
                    <div className="multiple-dots"></div>
                    <div className="save">
                        <div className="action__icon" onClick={handleSavePost}>
                            {saveStatus ? (
                                <i className="bx bxs-bookmark icon-animation"></i>
                            ) : (
                                <i className="bx bx-bookmark"></i>
                            )}
                        </div>
                    </div>
                </div>
                {/* Like details */}
                <div className="row">
                    {likeStatus ? (
                        likeList.length > 1 ? (
                            <p className="like-details">
                                Liked by <span>you</span> and{' '}
                                <span>{likeList.length - 1} other users</span>
                            </p>
                        ) : (
                            <p className="like-details">
                                Liked by <span>you</span>
                            </p>
                        )
                    ) : (
                        <p className="like-details">
                            Liked by <span>{likeList.length} users</span>
                        </p>
                    )}
                    {/* <AvatarGroup max={3}>
                        <Avatar
                            sx={{ width: 20, height: 20 }}
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                        />
                        <Avatar
                            sx={{ width: 20, height: 20 }}
                            alt="Travis Howard"
                            src="/static/images/avatar/2.jpg"
                        />
                        <Avatar
                            sx={{ width: 20, height: 20 }}
                            alt="Cindy Baker"
                            src="/static/images/avatar/3.jpg"
                        />
                    </AvatarGroup> */}
                </div>
                {/* User caption */}
                <div className="post__user-caption">
                    <p className="caption">
                        <span className="user__name">{postData.userName}</span>
                        {/* {postData.caption} */}
                        {renderCaption}
                        {showMoreCapsBtn ? (
                            <button
                                className="btn-trans"
                                onClick={handleShowMoreCaps}
                            >
                                ... more
                            </button>
                        ) : (
                            ''
                        )}
                    </p>
                </div>
                {/* Comment details */}

                {commentList.length > 2 && !viewAllCmts ? (
                    <button
                        className="view-all-cmt btn-trans"
                        onClick={() => {
                            setViewAllCmts(true);
                            setCmtRenderList(commentList);
                        }}
                    >
                        View all {commentList.length} comments
                    </button>
                ) : commentList.length > 2 && viewAllCmts ? (
                    <button
                        className="view-all-cmt btn-trans"
                        onClick={() => {
                            setViewAllCmts(false);
                            setCmtRenderList(commentList.slice(0, 2));
                        }}
                    >
                        Hide {commentList.length - 2} comments
                    </button>
                ) : (
                    ''
                )}
                {cmtRenderList.length > 0 ? (
                    <div className="post__comment-list">
                        {cmtRenderList.map((comment) => (
                            <div className="post__comment row" key={comment.id}>
                                <div className="content row">
                                    <p
                                        className="user__name clickable"
                                        onClick={() =>
                                            navigate(
                                                '/' + comment.data.userName
                                            )
                                        }
                                    >
                                        {comment.data.userName}
                                    </p>
                                    <p className="caption">
                                        {comment.data.content}
                                    </p>
                                </div>
                                {/* <div className="like-cmt">
                                    <i className="bx bx-heart"></i>
                                </div> */}
                            </div>
                        ))}
                    </div>
                ) : (
                    ''
                )}
                <div className="time-tag btn-trans">
                    {moment(postData.dateCreated.toDate()).fromNow()}
                </div>
            </div>
            <div className="row post__footer text-input-container">
                <div
                    className={`action__icon emoji-${props.postId}`}
                    onClick={() => picker.togglePicker(trigger)}
                >
                    <i className="bx bx-wink-smile"></i>
                </div>
                <textarea
                    ref={cmtRef}
                    value={comment}
                    placeholder="Add a comment..."
                    onKeyDown={handleEnter}
                    onChange={(e) => {
                        setComment(e.target.value);
                        if (e.target.value.length <= 10)
                            e.target.style.height = '18px';
                        else
                            e.target.style.height = (e.target.scrollHeight) + "px";
                    }}
                />
                <button
                    disabled={!comment}
                    className="send-btn"
                    onClick={handleCommentPost}
                >
                    Post
                </button>
            </div>
        </div>
    );
};

export default PostItem;
