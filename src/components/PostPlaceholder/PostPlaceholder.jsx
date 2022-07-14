import React from 'react';
import PlaceholderLoading from 'react-placeholder-loading';

// import './PostPlaceholder.css';

const PostPlaceholder = () => {
    return (
        <div className="post__container">
            {/* Header */}
            <div className="post__header row">
                <div className="user row clickable">
                    <PlaceholderLoading
                        className="user__ava"
                        shape="circle"
                        width={32}
                        height={32}
                    />
                    <PlaceholderLoading
                        className="user__name"
                        shape="rect"
                        width={100}
                        height={16}
                    />
                </div>
                <div className="post__header-options action__icon">
                    <i className="bx bx-dots-horizontal-rounded clickable"></i>
                </div>
            </div>
            {/* Main post */}
            <div className="post__media">
                <PlaceholderLoading shape="rect" width={470} height={470} />
            </div>
            {/* Below */}
            <div className="post__below-container">
                {/* Interaction */}
                <div className="row interaction-row">
                    <div className="row interaction-group">
                        <div className="action__icon clickable">
                            <i className="bx bx-heart"></i>
                        </div>
                        <div className="action__icon">
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
                <div className="row">
                    <PlaceholderLoading shape="rect" width={100} height={16} />
                </div>
                {/* User caption */}
                <div className="post__user-caption">
                    <p className="caption">
                        <PlaceholderLoading
                            shape="rect"
                            width={440}
                            height={16}
                        />
                        <PlaceholderLoading
                            shape="rect"
                            width={200}
                            height={16}
                        />
                    </p>
                </div>
                {/* Comment details */}

                <PlaceholderLoading shape="rect" width={100} height={16} />
                <div className="post__comment-list">
                    <div className="post__comment row">
                        <div className="content row">
                            <PlaceholderLoading
                                shape="rect"
                                width={50}
                                height={16}
                            />
                            <PlaceholderLoading
                                shape="rect"
                                width={150}
                                height={16}
                            />
                        </div>
                    </div>
                    <div className="post__comment row">
                        <div className="content row">
                            <PlaceholderLoading
                                shape="rect"
                                width={50}
                                height={16}
                            />
                            <PlaceholderLoading
                                shape="rect"
                                width={150}
                                height={16}
                            />
                        </div>
                    </div>
                </div>
                <div className="time-tag btn-trans">
                    <PlaceholderLoading shape="rect" width={50} height={16} />
                </div>
            </div>
            <div className="row post__footer text-input-container">
                <div className="action__icon emoji">
                    <i className="bx bx-wink-smile"></i>
                </div>
                <textarea
                    className="add-cmt"
                    name="cmt"
                    placeholder="Add a comment..."
                />
                <button className="post-cmt-btn">Post</button>
            </div>
        </div>
    );
};

export default PostPlaceholder;
