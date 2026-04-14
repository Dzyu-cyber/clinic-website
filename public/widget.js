(function() {
  const scriptTag = document.currentScript;
  const orgId = scriptTag.getAttribute('data-org-id') || 'DEV_ORG_123';
  const apiUrl = scriptTag.getAttribute('data-api-url') || 'http://localhost:3000';

  // 1. Inject Styles
  const styles = `
      #noesis-widget-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 999999;
          font-family: system-ui, -apple-system, sans-serif;
      }
      #noesis-bubble {
          width: 60px;
          height: 60px;
          background: #4f46e5;
          border-radius: 50%;
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
          color: white;
      }
      #noesis-bubble:hover {
          transform: scale(1.05);
      }
      #noesis-chat-window {
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 380px;
          height: 600px;
          max-height: 80vh;
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          opacity: 0;
          pointer-events: none;
          transform: translateY(20px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid #e5e7eb;
      }
      #noesis-chat-window.noesis-open {
          opacity: 1;
          pointer-events: all;
          transform: translateY(0);
      }
      #noesis-header {
          background: #4f46e5;
          color: white;
          padding: 20px;
          font-weight: 600;
          font-size: 1.1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
      }
      #noesis-close {
          cursor: pointer;
          font-size: 1.5rem;
          line-height: 1;
          opacity: 0.8;
      }
      #noesis-close:hover { opacity: 1; }
      #noesis-messages {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #f8fafc;
      }
      .noesis-msg {
          max-width: 85%;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 0.95rem;
          line-height: 1.4;
      }
      .noesis-bot {
          background: white;
          color: #1e293b;
          align-self: flex-start;
          border-bottom-left-radius: 2px;
          border: 1px solid #e2e8f0;
      }
      .noesis-user {
          background: #4f46e5;
          color: white;
          align-self: flex-end;
          border-bottom-right-radius: 2px;
      }
      #noesis-input-area {
          padding: 16px;
          background: white;
          border-top: 1px solid #e5e7eb;
          display: flex;
          gap: 8px;
      }
      #noesis-input {
          flex: 1;
          padding: 12px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          outline: none;
          font-size: 0.95rem;
      }
      #noesis-input:focus {
          border-color: #4f46e5;
      }
      #noesis-send {
          background: #4f46e5;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 0 20px;
          font-weight: 600;
          cursor: pointer;
      }
      #noesis-send:disabled {
          background: #94a3b8;
          cursor: not-allowed;
      }
      .noesis-loading-dots {
          display: flex;
          gap: 4px;
          padding: 4px;
      }
      .noesis-loading-dots span {
          width: 6px;
          height: 6px;
          background: #94a3b8;
          border-radius: 50%;
          animation: noesis-bounce 1.4s infinite ease-in-out both;
      }
      .noesis-loading-dots span:nth-child(1) { animation-delay: -0.32s; }
      .noesis-loading-dots span:nth-child(2) { animation-delay: -0.16s; }
      @keyframes noesis-bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
      }
  `;
  const styleEl = document.createElement('style');
  styleEl.innerHTML = styles;
  document.head.appendChild(styleEl);

  // 2. Inject HTML
  const container = document.createElement('div');
  container.id = 'noesis-widget-container';
  container.innerHTML = `
      <div id="noesis-chat-window">
          <div id="noesis-header">
              <span>Customer Support</span>
              <span id="noesis-close">&times;</span>
          </div>
          <div id="noesis-messages">
              <div class="noesis-msg noesis-bot">Hello! How can I help you today?</div>
          </div>
          <form id="noesis-input-area">
              <input type="text" id="noesis-input" placeholder="Type your message..." autocomplete="off" />
              <button type="submit" id="noesis-send">Send</button>
          </form>
      </div>
      <div id="noesis-bubble">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
      </div>
  `;
  document.body.appendChild(container);

  // 3. Logic Layer
  const bubble = document.getElementById('noesis-bubble');
  const chatWindow = document.getElementById('noesis-chat-window');
  const closeBtn = document.getElementById('noesis-close');
  const form = document.getElementById('noesis-input-area');
  const input = document.getElementById('noesis-input');
  const messagesArea = document.getElementById('noesis-messages');
  const sendBtn = document.getElementById('noesis-send');

  const toggleWindow = () => {
      chatWindow.classList.toggle('noesis-open');
  };

  bubble.addEventListener('click', toggleWindow);
  closeBtn.addEventListener('click', toggleWindow);

  const appendMessage = (text, sender) => {
      const msg = document.createElement('div');
      msg.className = \`noesis-msg \${sender === 'user' ? 'noesis-user' : 'noesis-bot'}\`;
      msg.innerText = text;
      messagesArea.appendChild(msg);
      messagesArea.scrollTop = messagesArea.scrollHeight;
  };

  const showLoading = () => {
      const msg = document.createElement('div');
      msg.className = 'noesis-msg noesis-bot';
      msg.id = 'noesis-loading';
      msg.innerHTML = '<div class="noesis-loading-dots"><span></span><span></span><span></span></div>';
      messagesArea.appendChild(msg);
      messagesArea.scrollTop = messagesArea.scrollHeight;
  };

  const hideLoading = () => {
      const loader = document.getElementById('noesis-loading');
      if (loader) loader.remove();
  };

  form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;

      appendMessage(text, 'user');
      input.value = '';
      sendBtn.disabled = true;
      showLoading();

      try {
          const res = await fetch(\`\${apiUrl}/api/chat\`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ organizationId: orgId, query: text })
          });
          const data = await res.json();
          hideLoading();
          
          if (res.ok) {
              appendMessage(data.answer, 'bot');
          } else {
              appendMessage("Sorry, I'm having trouble connecting right now.", 'bot');
          }
      } catch (err) {
          hideLoading();
          appendMessage("An error occurred connecting to the server.", 'bot');
      } finally {
          sendBtn.disabled = false;
          input.focus();
      }
  });

})();
