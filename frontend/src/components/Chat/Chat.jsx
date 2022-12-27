/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { v4 } from 'uuid';
import { getMessageHistory, getNewMessage } from '../../store/chatReducer/chatReducer';
import './Chat.css';

function Chat() {
  console.log('render');
  const dispatch = useDispatch();
  const [socket] = useState(io('ws://localhost:4000'));
  // const [connected, setConnected] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { messageHistory } = useSelector((state) => state.chat);
  const handleSendMessage = (event) => {
    event.preventDefault();
    const newMessage = {
      message: event.target.text.value,
      id: user.id,
      name: user.name,
    };
    socket.emit('message', newMessage);
  };

  useEffect(() => {
    socket.emit('get_message');
    socket.on('send_message', (allMessage) => {
      dispatch(getMessageHistory({ allMessage }));
    });

    socket.on('new-message', (newMessage) => {
      dispatch(getNewMessage({ newMessage }));
    });

    return () => {
      socket.off('connect');
    };
  }, []);

  return (
    <>
      {user && (
      <div className="nes-container nes-container_chat is-rounded is-dark chat anim-show-chat">
        <h1>
          <span className="blue">OUR</span>
          {' '}
          <span className="yellow">COMMUNITY</span>
        </h1>
        <form className="form__chat" onSubmit={handleSendMessage}>
          <input
            name="text"
            className="nes-input"
            type="text"
            placeholder="пиши сюда"
          />
          <button type="submit">Отправить</button>
        </form>
        <div className="messages">
          {[...messageHistory].reverse().map((message) => (
            <div className="message" key={v4()}>
              {`${message['User.name']}: ${message.message}`}
            </div>
          ))}
        </div>
      </div>
      )}
      <Link className="return-rating btn-back" to="/">
        &lt;&lt; НАЗАД
      </Link>
    </>
  );
}

export default Chat;
