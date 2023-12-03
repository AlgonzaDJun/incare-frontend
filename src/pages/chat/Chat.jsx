import axios from "axios";
import SidebarSecond from "../../components/SidebarSecond";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
export default function Chat() {
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const pusher = new Pusher("35a02302da3f176bca9d", {
      cluster: "ap1",
      encrypted: true,
    });

    const channel = pusher.subscribe("chat");
    channel.bind("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  const sendMessage = async () => {
    if (sender && receiver && message) {
      await axios.post("http://localhost:5000/message", {
        sender,
        receiver,
        message,
      });
      setMessage("");
    }
  };
  return (
    <>
      <SidebarSecond>
        <div className="flex">
          <div>
            <div>
              <label>Your User:</label>
              <input
                type="text"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
              />
            </div>
            <div>
              <label>Send to User:</label>
              <input
                type="text"
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
              />
            </div>
            <div>
              <label>Message:</label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
            <div>
              <h2>Chat History</h2>
              <ul>
                {messages.map((msg, index) => (
                  <li key={index}>
                    <strong>{msg.user}:</strong> {msg.message}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </SidebarSecond>
    </>
  );
}
