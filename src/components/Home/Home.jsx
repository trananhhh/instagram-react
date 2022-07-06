import React from 'react';
import PostItem from '../PostItem';

const Home = ({ posts, username, handleComment, handleDeletePost }) => {
    return (
        <>
            {/* Post list */}
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
                        />
                    ))}
            </div>
        </>
    );
};

export default Home;
