/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { io } from 'socket.io-client';
import io from 'socket.io-client';
import { v4 } from 'uuid';
import { } from '../../store/chatReducer/chatReducer';
import './Chat.css';

// const socketIo = io('ws://localhost:4000');

function Chat() {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState({});
  const [value, setValue] = useState('');
  const socket = useRef();
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState('');

  const { user } = useSelector((state) => state.auth); // подключаем юзера из реакт редакса
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  // useEffect(() => {
  //   socket.on('connect', () => {
  //     setIsConnected(true);
  //   });

  //   socket.on('disconnect', () => {
  //     setIsConnected(false);
  //   });

  //   socket.on('pong', () => {
  //     setLastPong(new Date().toISOString());
  //   });

  //   return () => {
  //     socket.off('connect');
  //     socket.off('disconnect');
  //     socket.off('pong');
  //   };
  // }, []);

  function connect() {
    console.log('connect', io);
    // socket.current = io('http://localhost:4000');
    // const socketIo = io('ws://localhost:4000');
    // socket.current = new WebSocket('ws://localhost:4000');

    // socket.current.onopen = () => {
    //   console.log('Socket открыт');
    //   // setConnected(true);
    //   const message = {
    //     event: 'connection',
    //     username: user.name,
    //     id: user.id,
    //   };
    //   setUsername(user.name);
    //   socket.current.send(JSON.stringify(message));
    // };
    // socket.current.onmessage = (event) => {
    //   const message = JSON.parse(event.data);
    //   setMessages((prev) => [message, ...prev]);
    //   console.log(message);
    // };
    // socket.current.onclose = () => {
    //   console.log('Socket закрыт');
    // };
    // socket.current.onerror = () => {
    //   console.log('Socket произошла ошибка');
    // };
  }
  useEffect(() => {
    connect();
    // setConnected(true);
  }, []);

  // useEffect(() => {
  //   fetch('http://localhost:4000/api/chat')
  //     .then((data) => data.json())
  //     .then((data) => setHistory(data));
  // }, []);

  const sendMessage = async (event) => {
    event.preventDefault();
    // const message = {
    //   username: user.name,
    //   message: value,
    //   mess_id: v4(),
    //   event: 'message',
    // };
    // socket.current.send(JSON.stringify(message));
    // setValue('');
    // dispatch(addMessage(event.target.messText.value));
  };

  return (
    <>
      <div className="nes-container nes-container_chat is-rounded is-dark chat anim-show-chat">
        <h1>
          <span className="blue">OUR</span>
          {' '}
          <span className="yellow">COMMUNITY</span>
        </h1>
        <form className="form__chat" onSubmit={sendMessage}>
          <input value={value} onChange={(e) => setValue(e.target.value)} type="text" name="messText" />
          <button type="submit">Отправить</button>
        </form>
        <div>
          <div className="messages">
            {messages.map((mess) => (
              <div key={v4()}>
                {mess.event === 'connection'
                  ? (
                    <div className="message" />
                  )
                  : (
                    <div className="message" key={v4()}>
                      {mess.username}
                      :
                      {mess.message}
                    </div>
                  )}
              </div>
            ))}
            {history.chats !== undefined ? history.chats.map((message) => (
              <div className="message">
                {message.User.name}
                :
                {message.message}
              </div>
            ))
              : (
                <div className="message">
                  Подожди немного
                </div>
              )}
          </div>
        </div>
      </div>
      <Link className="return-rating btn-back" to="/">
        &lt;&lt; НАЗАД
      </Link>

    </>
  );
}

export default Chat;
