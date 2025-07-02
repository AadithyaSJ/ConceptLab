import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import Groq from "groq-sdk";
import { auth, db } from "../firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

const systemMessage = {
  role: "system",
  content: "Explain science topics like you're teaching a high school student curious about how things work.",
};

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [audio] = useState(new Audio("/ding.mp3"));
  const chatRef = useRef(null);
  const botName = "Atom";

  useEffect(() => {
    const fetchHistory = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const chatDoc = await getDoc(doc(db, "chats", user.uid));
      if (chatDoc.exists()) {
        setMessages(chatDoc.data().messages || []);
      } else {
        await setDoc(doc(db, "chats", user.uid), { messages: [] });
      }
    };

    if (chatOpen) fetchHistory();
  }, [chatOpen]);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setIsTyping(true);

    await processMessageToGroq(updatedMessages);
  };

  async function processMessageToGroq(chatMessages) {
    const apiMessages = chatMessages.map((m) => ({
      role: m.sender === botName ? "assistant" : "user",
      content: m.message,
    }));

    try {
      const res = await groq.chat.completions.create({
        messages: [systemMessage, ...apiMessages],
        model: "llama3-8b-8192",
      });

      const reply = res.choices?.[0]?.message?.content || "I'm not sure about that.";

      const botReply = {
        message: reply,
        sender: botName,
      };

      const finalMessages = [...chatMessages, botReply];
      setMessages(finalMessages);
      setIsTyping(false);
      audio.play();

      const user = auth.currentUser;
      if (user) {
        await updateDoc(doc(db, "chats", user.uid), {
          messages: arrayUnion(botReply),
        });
      }
    } catch (err) {
      console.error("Groq error:", err);
      setMessages([...chatMessages, {
        message: "Sorry, something went wrong.",
        sender: botName,
      }]);
      setIsTyping(false);
    }
  }

  return (
    <div>
      {!chatOpen && (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
          {/* Yellow bubble prompt */}
          <motion.div
            className="mb-2 px-4 py-2  bg-yellow-400 text-black rounded-lg shadow text-sm relative"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 4  }}
          >
            Ask Atom about science!
            <div className="w-4 h-4 bg-yellow-400 rotate-45 absolute bottom-[-8px] left-1/2 -translate-x-1/2" />
          </motion.div>

          {/* Yellow chat icon button */}
          <motion.button
            onClick={() => setChatOpen(true)}
            className="p-3 bg-yellow-300 rounded-full text-black shadow-lg hover:bg-yellow-400"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, repeatDelay: 1.5 }}
          >
            🔬
          </motion.button>
        </div>
      )}

      <AnimatePresence>
        {chatOpen && (
          <motion.div
            className="fixed bottom-4 right-4 w-80 h-[500px] rounded-lg shadow-xl bg-white z-50 overflow-hidden flex flex-col"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            drag
            dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
            ref={chatRef}
          >
            {/* Yellow Header */}
            <div className="flex justify-between items-center px-4 py-2 bg-yellow-400 text-black rounded-t-lg">
              <span className="font-semibold">Atom - Science Chat</span>
              <button onClick={() => setChatOpen(false)} className="hover:text-red-500">✖</button>
            </div>

            <MainContainer style={{ height: "100%" }}>
              <ChatContainer>
                <MessageList
                  scrollBehavior="smooth"
                  typingIndicator={isTyping ? <TypingIndicator content="Atom is typing..." /> : null}
                >
                  {messages.map((m, idx) => (
                    <Message
                      key={idx}
                      model={{
                        message: m.message,
                        sentTime: m.sentTime,
                        direction: m.sender === botName ? "incoming" : "outgoing",
                      }}
                      avatarSrc={m.sender === botName ? "/atom.png" : undefined}
                      className={`${
                        m.sender === botName
                          ? "justify-start text-black bg-yellow-100"
                          : "justify-end text-white bg-yellow-500"
                      } rounded-lg p-2 max-w-xs`}
                    />
                  ))}
                </MessageList>
                <MessageInput
                  placeholder="Ask a science question..."
                  onSend={handleSend}
                  className="text-gray-700 px-2"
                />
              </ChatContainer>
            </MainContainer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Chatbot;
