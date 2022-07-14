import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import InMessage from '../../components/InMessage'
import OutMessage from '../../components/OutMessage'
import './Direct.css'
import { EmojiButton } from '@joeattardi/emoji-button';
import { db, database } from '../../firebaseConfig'
import { collection, getDocs, addDoc } from 'firebase/firestore'
// import { useCollectionData } from 'react-firebase-hooks/firestore'


const Direct = ({ loggedIn, username }) => {
    const [currentChatter, setCurrentChatter] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);


    // const messagesRef = db.collection('Messages');
    // const query = messagesRef.orderBy('dateCreated').limit(25);
    // const [messages] = useCollectionData(query, { idField: 'id' });

    const getMessages = async () => {
        const messageCol = collection(db, 'Messages');
        const snapshot = await getDocs(messageCol);
        setMessages(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                message: doc.data(),
            }))
        );
    }

    const [chattingFriends, setChattingFriends] = useState([
        {
            username: 'Thor',
            lastMess: "see ya!!!"
        },
        {
            username: 'Stark',
            lastMess: "Niceeee!!!"
        },
    ])

    const navigate = useNavigate();
    const picker = new EmojiButton({
        position: 'bottom-end',
        autoHide: false,
        showPreview: false,
        showSearch: false,
        showCategoryButtons: false,
    });
    const trigger = document.querySelector('.emoji');
    const textRef = useRef(null);

    useEffect(() => {
        handleFocusTextInput();
    }, [currentChatter])

    const handleSendMessage = () => {

    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleFocusTextInput = () => {
        textRef.current.focus();
    };

    useEffect(() => {
        if (!loggedIn)
            navigate('/');
    }, [loggedIn]);

    return (
        <>
            {/* Post list */}
            <div className="container direct-container">
                <div className="left-side">
                    <div className="left-side__header row">
                        <p className="username">{username}</p>
                        <div className="new-chat-btn">
                            <i className='bx bx-message-square-add'></i>
                        </div>
                    </div>
                    <div className="chatting-list">
                        {chattingFriends.length === 0 && (<p>No conversations</p>)}
                        {chattingFriends.map((e, i) => (
                            <div className="chatting-friend-items" key={i}>
                                <Avatar
                                    className="user__ava"
                                    alt={e.username}
                                    src="/static/images/avatar/1.jpg"
                                />
                                <div className="chatting-friend-items__details">
                                    <p className="friend-username">{e.username}</p>
                                    <p className="friend-last-mess">{e.lastMess}</p>
                                </div>
                            </div>
                        )
                        )}
                    </div>
                </div>
                <div className="right-side">
                    <div className="row chatting-header">
                        <Avatar
                            className="user__ava"
                            alt={currentChatter}
                            src="/static/images/avatar/1.jpg"
                        />
                        <p className="user_name">
                            {currentChatter}
                        </p>
                    </div>
                    <div className="chatting-container">
                        {messages.map((m) => (<p>{m.message.content}</p>))}
                        <InMessage content={"Hi there!!!!"} />
                        <OutMessage content={"Hello!!!!"} />
                    </div>
                    <div className="row message-input-container text-input-container">
                        <div
                            className="action__icon emoji"
                            onClick={() => picker.togglePicker(trigger)}
                        >
                            <i className="bx bx-wink-smile"></i>
                        </div>
                        <textarea
                            ref={textRef}
                            value={message}
                            placeholder="Message..."
                            onKeyDown={handleEnter}
                            onChange={(e) => {
                                setMessage(e.target.value);
                                if (e.target.value.length <= 10)
                                    e.target.style.height = '18px';
                                else
                                    e.target.style.height = (e.target.scrollHeight) + "px";
                            }}
                        />
                        <button
                            disabled={!message}
                            className="send-btn"
                            onClick={handleSendMessage}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Direct;
