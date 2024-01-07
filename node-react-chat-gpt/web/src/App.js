import './App.css';
import './styles/reset.css';
import { useState } from 'react';

import { makeRequest } from './api/api'
import SideMenu from './components/SideMenu/Sidemenu'
import ChatMessage from './components/ChatMessage/ChatMessage'

function App() {

  const [input, setInput] = useState("")
  const [chatLog, setChatLog] = useState([{
    user: "gpt",
    message: "O que você gostaria de saber??"
  }])


  async function handleSubmit(e) {
    e.preventDefault();

    let response = await makeRequest({ prompt: input })

    response = response.data.split('\n')
      .map(line => <p>{line}</p>);

    setChatLog([...chatLog, {
      user: 'me',
      message: `${input}`
    }, {
      user: 'gpt',
      message: response
    }])
    setInput("")
  }

  return (
    <div className='App'>

      <SideMenu></SideMenu>

      <section className='chatbox'>

        <div className='chat-log'>
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>

        <div className='chat-input-holder'>
          <form onSubmit={handleSubmit}>
            <label>
              Faça a sua pergunta
              <input
                rows='1'
                className='chat-input-textarea'
                value={input}
                onChange={e => setInput(e.target.value)}
              >
              </input>
            </label>
            <input type='submit' value={"Enviar"} />
          </form>
        </div>
      </section>

    </div>
  );
}

export default App;
