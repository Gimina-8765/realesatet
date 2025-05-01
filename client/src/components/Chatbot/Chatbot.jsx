import React, { useState, useEffect } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Dynamically load the Jotform script
    const script = document.createElement("script");
    script.src = "https://cdn.jotfor.ms/s/umd/latest/for-embedded-agent.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Initialize the chatbot after the script is loaded
      window.AgentInitializer.init({
        rootId: "JotformAgent-019662c206497a04879c7ac0319e96c0b45f",
        formID: "019662c206497a04879c7ac0319e96c0b45f",
        queryParams: ["skipWelcome=1", "maximizable=1"],
        domain: "https://www.jotform.com",
        isInitialOpen: false,
        isDraggable: false,
        background: "linear-gradient(180deg, #6C73A8 0%, #6C73A8 100%)",
        buttonBackgroundColor: "#0066C3",
        buttonIconColor: "#FFFFFF",
        variant: false,
        customizations: {
          greeting: "Yes",
          greetingMessage: "Hi! How can I assist you?",
          pulse: "Yes",
          position: "right",
        },
      });
    };

    return () => {
      // Cleanup the script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="chatbot-wrapper">
      

      {isOpen && (
        <div className="chatbot-dialog">
          <div id="JotformAgent-019662c206497a04879c7ac0319e96c0b45f"></div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;