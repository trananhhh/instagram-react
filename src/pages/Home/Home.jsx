import React from 'react';
import PostPlaceholder from '../../components/PostPlaceholder'
import PostItem from '../../components/PostItem';

const Home = ({
    posts,
    username,
    handleComment,
    handleDeletePost,
    handleRequireLogin,
    loading
}) => {
    return (
        <>
            {loading ? (
                <>
                    <PostPlaceholder />
                    <PostPlaceholder />
                    <PostPlaceholder />
                </>
            ) : (
                <div className="post__list">
                    {posts
                        .sort((post1, post2) => {
                            return post2.post.dateCreated - post1.post.dateCreated;
                        })
                        .map(({ id, post }) => (
                            <PostItem
                                key={id}
                                postId={id}
                                data={post}
                                username={username}
                                commentOnClick={handleComment}
                                handleDeletePost={handleDeletePost}
                                handleRequireLogin={handleRequireLogin}
                            />
                        ))}

                </div>
            )
            }
        </>
    );
};

export default Home;
