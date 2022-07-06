import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PostItem from './components/PostItem';
import { auth, db, storage } from './firebaseConfig';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signOut,
} from 'firebase/auth';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { Box, Modal, LinearProgress } from '@mui/material';
import Dropzone from 'react-dropzone';
// import { Carousel } from 'react-carousel-minimal';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 360,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    outline: 0,
    border: 0,
    p: '48px 48px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    input: {
        border: 0,
        borderRadius: 1,
        bgcolor: '#efefef',
        p: '10px 16px',
        display: 'block',
        width: '320px',
        mt: 2,
        outline: 0,
    },
    img: {
        height: 48,
    },
    button: {
        border: 0,
        borderRadius: 1,
        p: '10px 8px',
        display: 'block',
        width: '352px',
        mt: 2,
        outline: 0,
    },
};

const uploadModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: '800px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    outline: 0,
    border: 0,
    p: '48px 48px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textarea: {
        resize: 'none',
        height: '150px',
        // minHeight: '30px',
        // maxHeight: '150px',
        border: 0,
        borderRadius: 2,
        bgcolor: '#efefef',
        p: '10px 16px',
        display: 'block',
        width: '100%',
        outline: 0,
    },
    button: {
        border: 0,
        borderRadius: 1,
        p: '10px 8px',
        display: 'block',
        width: '352px',
        mt: 2,
        outline: 0,
    },
    h2: {
        mt: 0,
        mb: '48px',
    },
};

function App() {
    const [openModalSignUp, setOpenModalSignUp] = useState(false);
    const [openModalSignIn, setOpenModalSignIn] = useState(false);
    const [openModalUpload, setOpenModalUpload] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [posts, setPosts] = useState([]);
    const [uid, setUid] = useState('');
    const [user, setUser] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');
    const [images, setImages] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const postsCol = collection(db, 'Posts');
        const snapshot = await getDocs(postsCol);
        setPosts(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                post: doc.data(),
            }))
        );
        // console.log(snapshot);
    };

    const handleSignUpOnClick = (openStatus) => {
        setOpenModalSignUp(openStatus);
    };

    const handleLogInOnClick = (openStatus) => {
        setOpenModalSignIn(openStatus);
    };

    const handleLogOutOnClick = () => {
        signOut(auth)
            .then(() => {
                setUser(null);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleUploadOnClick = (openStatus) => {
        setOpenModalUpload(openStatus);
    };

    useEffect(() => {
        const unSubcribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setUsername(user.displayName);
            } else setUser(null);
        });
        return () => unSubcribe();
    }, [user, username]);

    const handleSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    setUid(userCredential.user.uid);
                    // console.log(userCredential.user.uid);
                })
                .catch((error) => alert(error.message));
            await updateProfile(auth.currentUser, {
                displayName: username,
            }).catch((error) => alert(error.message));
        } catch (error) {
            alert(error.message);
        }
        setOpenModalSignUp(false);
    };

    const handleSignIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    setUser(userCredential.user);
                    setUid(userCredential.user.uid);
                    setUsername(userCredential.user.username);
                })
                .catch((error) => console.log(error));
        } catch (error) {
            alert(error.message);
        }
        setOpenModalSignIn(false);
    };

    const handleComment = () => {
        getData();
    };

    const handleUpload = async () => {
        console.log(images);
        let mediaUrls = [];

        const getMediaDownloadUrl = async (ref) => {
            return new Promise((resolve) => {
                getDownloadURL(ref).then((downloadURL) => resolve(downloadURL));
            });
        };

        const getImagePromises = images.map(async (image, i) => {
            const storageRef = ref(storage, 'images/' + image.name);
            const uploadTask = uploadBytesResumable(storageRef, image);
            mediaUrls[i] = await getMediaDownloadUrl(uploadTask.snapshot.ref);
        });

        Promise.all(getImagePromises).then(() => {
            try {
                addDoc(collection(db, 'Posts'), {
                    mediaUrls: mediaUrls,
                    userName: username,
                    dateCreated: new Date(),
                    caption: caption,
                }).then((e) => {
                    // console.log(e);
                    setImages([]);
                    setProgress(0);
                    setCaption('');
                    setOpenModalUpload(false);
                    getData();
                });
            } catch (e) {
                console.error('Error adding document: ', e);
            }
        });
    };

    useEffect(() => {
        if (images.length === 0) {
            return;
        }
        // console.log(images);
        const imagesUrl = images.map((image) => URL.createObjectURL(image));
        setData(imagesUrl);
        // setData(imagesUrl.reduce((prev, cur) => [...prev, { image: cur }], []));
        return () => imagesUrl.map((e) => URL.revokeObjectURL(e));
    }, [images]);

    const handleDeletePost = (postId) => {
        setPosts((posts) => posts.filter((post) => post.id !== postId));
    };

    return (
        <div className="App">
            <Header
                signUpOnClick={handleSignUpOnClick}
                logOutOnClick={handleLogOutOnClick}
                logInOnClick={handleLogInOnClick}
                uploadOnClick={handleUploadOnClick}
                user={user}
            />
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
            {/* Sign-up modal */}
            <Modal
                open={openModalSignUp}
                onClose={() => setOpenModalSignUp(false)}
            >
                <Box sx={modalStyle}>
                    <img
                        src="https://www.instagram.com/static/images/web/logged_out_wordmark-2x.png/d2529dbef8ed.png"
                        alt="Logo"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <p className="secondary-text modal-text">
                        People who use our service may have uploaded your
                        contact information to Instagram.
                        <strong> Learn More</strong>
                    </p>
                    <p className="secondary-text modal-text">
                        By signing up, you agree to our{' '}
                        <strong>Terms, Data Policy</strong> and{' '}
                        <strong>Cookies Policy</strong>.
                    </p>
                    <button className="btn btn-primary" onClick={handleSignUp}>
                        Sign up
                    </button>
                </Box>
            </Modal>
            {/* Sign-in modal */}
            <Modal
                open={openModalSignIn}
                onClose={() => setOpenModalSignIn(false)}
            >
                <Box sx={modalStyle}>
                    <img
                        src="https://www.instagram.com/static/images/web/logged_out_wordmark-2x.png/d2529dbef8ed.png"
                        alt="Logo"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={handleSignIn}>
                        Sign in
                    </button>
                </Box>
            </Modal>
            {/* Upload modal */}
            <Modal
                open={openModalUpload}
                onClose={() => {
                    setOpenModalUpload(false);
                    setImages([]);
                    setProgress(0);
                }}
            >
                <Box sx={uploadModalStyle}>
                    <h2 className="modalLable"> Create new post</h2>
                    {images.length ? (
                        <div className="upload-container">
                            <div className="upload__img">
                                {/* <Carousel
                                    data={data}
                                    dots={true}
                                    width="600px"
                                    height="600px"
                                    showNavBtn={images.length > 1}
                                /> */}
                                <Swiper
                                    navigation={true}
                                    pagination={{ clickable: true }}
                                    modules={[Pagination, Navigation]}
                                    className="mySwiper"
                                >
                                    {data.map((img, i) => (
                                        <SwiperSlide
                                            className="slideImage"
                                            key={i}
                                        >
                                            <img src={img} alt="images" />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                            <div className="upload__caption-submit">
                                <LinearProgress
                                    variant="determinate"
                                    value={progress}
                                    className="upload__progress-bar"
                                />
                                <textarea
                                    maxLength="500"
                                    type="text"
                                    placeholder="Caption"
                                    onChange={(e) => setCaption(e.target.value)}
                                />
                                <button
                                    className="btn btn-primary"
                                    onClick={handleUpload}
                                >
                                    Upload
                                </button>
                                <button
                                    className="btn"
                                    onClick={() => {
                                        setImages([]);
                                        setProgress(0);
                                    }}
                                >
                                    Discard
                                </button>
                                <Dropzone
                                    onDrop={(e) =>
                                        setImages((arr) => [...arr, e[0]])
                                    }
                                >
                                    {({ getRootProps, getInputProps }) => (
                                        <div
                                            {...getRootProps()}
                                            className="dropzone optional"
                                        >
                                            <input {...getInputProps()} />
                                            <p>Add more ...</p>
                                            <i className="bx bxs-cloud-upload"></i>
                                        </div>
                                    )}
                                </Dropzone>
                            </div>
                        </div>
                    ) : (
                        <Dropzone onDrop={(e) => setImages(e)}>
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps()} className="dropzone">
                                    <input {...getInputProps()} />
                                    <p>
                                        Drag 'n' drop some files here, or click
                                        to select files
                                    </p>
                                    <i className="bx bxs-cloud-upload"></i>
                                </div>
                            )}
                        </Dropzone>
                    )}
                </Box>
            </Modal>
        </div>
    );
}

export default App;
