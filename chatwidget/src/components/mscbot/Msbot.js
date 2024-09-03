import React, { useState, useEffect, useRef } from 'react';
import './chat.css';
import './home.css';
import axios from 'axios'
const Msbot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const chatboxRef = useRef(null);

//   useEffect(() => {
//     firstBotMessage();
//   }, []);

  const handleToggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendButton();
    }
  };

  const handleSendButton =async () => {
    const userText = userInput.trim();
    if (userText !== '') {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'user', content: userText, timestamp: getTime() },
      ]);
      setUserInput('');
      const abc=await axios.get(`http://localhost:8890/sample`)
      console.log(abc);
      getHardResponse(userText);
    }
  };

  const getBotResponse = (input) => {
    if (input === 'rock') {
      return 'paper';
    } else if (input === 'paper') {
      return 'scissors';
    } else if (input === 'scissors') {
      return 'rock';
    }

    if (input === 'hello') {
      return 'Hello there!';
    } else if (input === 'goodbye') {
      return 'Talk to you later!';
    } else {
      return 'Try asking something else!';
    }
  };

  const getTime = () => {
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();

    if (hours < 10) {
      hours = '0' + hours;
    }

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    let time = hours + ':' + minutes;
    return time;
  };

  const firstBotMessage = () => {
    let firstMessage = "How's it going?";
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'bot', content: firstMessage, timestamp: getTime() },
    ]);
  };

  const getHardResponse = (userText) => {
    let botResponse = getBotResponse(userText);
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'bot', content: botResponse, timestamp: getTime() },
    ]);
  };

  const renderChatMessages = () => {
    return chatMessages.map((message, index) => {
      return (
        <div key={index}>
          <h5 className="chat-timestamp">{message.timestamp}</h5>
          <p className={message.sender === 'bot' ? 'botText' : 'userText'}>
            <span>{message.content}</span>
          </p>
        </div>
      );
    });
  };

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="chat-bar-collapsible">
      <button
        id="chat-button"
        type="button"
        className={`collapsible ${chatOpen ? 'active' : ''}`}
        onClick={handleToggleChat}
      >
        Chat with us!
        
      </button>
    
      {chatOpen && (
        // <div className="content">
          <div className="full-chat-block">
            <div className="outer-container">
              <div className="chat-container">
                <div
                  id="chatbox"
                  ref={chatboxRef}
                  style={{ maxHeight: '450px', overflowY: 'scroll' }}
                >
                  {renderChatMessages()}
                </div>

                <div className="chat-bar-input-block">
                  <div id="userInput">
                    <input
                      id="textInput"
                      className="input-box"
                      type="text"
                      name="msg"
                      placeholder="Tap 'Enter' to send a message"
                      value={userInput}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                    />
                  </div>

                  <div className="chat-bar-icons">
                    <i
                      id="chat-icon"
                      style={{ color: 'crimson' }}
                      className="fa fa-fw fa-heart"
                      onClick={() => handleSendButton('Heart clicked!')}
                    ></i>
                    <i
                      id="chat-icon"
                      style={{ color: '#333' }}
                      className="fa fa-fw fa-send"
                      onClick={handleSendButton}
                    ></i>
                  </div>
                </div>

                <div id="chat-bar-bottom">
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        // </div>
      )}
    </div>
  );
};

export default Msbot;
