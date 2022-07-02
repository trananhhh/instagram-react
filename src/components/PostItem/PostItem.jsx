import React, { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarGroup } from '@mui/material';
import './PostItem.css';
import { db } from '../../firebaseConfig';
import moment from 'moment';
import {
    collection,
    getDocs,
    addDoc,
    doc,
    query,
    orderBy,
} from 'firebase/firestore';

const PostItem = (props) => {
    const postData = props.data;

    const [commentList, setCommentList] = useState([]);
    const [comment, setComment] = useState('');
    const [cmtRenderList, setCmtRenderList] = useState([]);
    const [viewAllCmts, setViewAllCmts] = useState(false);
    const cmtRef = useRef(null);

    const getComments = async (postId) => {
        const cmtCol = collection(db, 'Posts/' + postId, 'comments');
        const snapshot = await getDocs(cmtCol);
        setCommentList(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                cmt: doc.data(),
            }))
        );
    };

    useEffect(() => {
        getComments(props.postId);
    }, [props.postId]);

    const handleCommentPost = () => {
        try {
            const docRef = addDoc(
                collection(db, 'Posts/' + props.postId, 'comments'),
                {
                    content: comment,
                    userName: props.username,
                    dateCreated: new Date(),
                }
            );
            console.log('Document written with ID: ', docRef.id);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
        getComments(props.postId);
        setComment('');
        setViewAllCmts(false);
        props.commentOnClick(true);
    };
    useEffect(() => {
        setCmtRenderList(
            commentList.length >= 2
                ? commentList
                      .sort((cmt1, cmt2) => {
                          return cmt1.cmt.dateCreated - cmt2.cmt.dateCreated;
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

    return (
        <div className="post__container">
            {/* Header */}
            <div className="post__header post__row">
                <div className="user post__row">
                    <Avatar
                        className="user__ava"
                        alt={postData.userName}
                        src="/static/images/avatar/1.jpg"
                    />
                    <p className="user__name">{postData.userName}</p>
                </div>
                <div className="post__header-options action__icon">
                    <i className="bx bx-dots-horizontal-rounded"></i>
                </div>
            </div>
            {/* Main post */}
            <div className="post__media">
                <img alt="#" src={postData.mediaUrl} />
            </div>
            {/* Below */}
            <div className="post__below-container">
                {/* Interaction */}
                <div className="post__row interaction-row">
                    <div className="post__row interaction-group">
                        <div className="action__icon">
                            <i className="bx bx-heart"></i>
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
                        <div className="action__icon">
                            <i className="bx bx-bookmark"></i>
                        </div>
                    </div>
                </div>
                {/* Like details */}
                <div className="post__row">
                    {/* {if} */}
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
                    </AvatarGroup>
                    <p className="like-details">
                        Liked by <span>trananhhh</span> and <span>others</span>
                    </p> */}
                </div>
                {/* User caption */}
                <div className="post__user-caption">
                    <p className="caption">
                        <span className="user__name">{postData.userName}</span>
                        {postData.caption}
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
                ) : (
                    ''
                )}
                {cmtRenderList.length > 0 ? (
                    <div className="post__comment-list">
                        {cmtRenderList.map((comment) => (
                            <div
                                className="post__comment post__row"
                                key={comment.id}
                            >
                                <div className="content post__row">
                                    <p className="user__name">
                                        {comment.cmt.userName}
                                    </p>
                                    <p className="caption">
                                        {comment.cmt.content}
                                    </p>
                                </div>
                                <div className="like-cmt">
                                    <i className="bx bx-heart"></i>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    ''
                )}
                <button className="time-tag btn-trans">
                    {moment(postData.dateCreated.toDate()).fromNow()}
                </button>
            </div>
            <div className="post__row post__footer">
                <div className="action__icon">
                    <i className="bx bx-wink-smile"></i>
                </div>
                <input
                    ref={cmtRef}
                    className="add-cmt"
                    value={comment}
                    name="cmt"
                    placeholder="Add a comment..."
                    onKeyDown={handleEnter}
                    onChange={(e) => {
                        setComment(e.target.value);
                    }}
                />
                <button
                    disabled={!comment}
                    className="post-cmt-btn"
                    onClick={handleCommentPost}
                >
                    Post
                </button>
            </div>
        </div>
    );
};

export default PostItem;
