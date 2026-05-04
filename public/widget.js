(function() {
  // document.currentScript is null when a type=module script exists on the page.
  // Use querySelector to find this script tag by its src as a reliable fallback.
  const scriptTag = document.currentScript ||
    document.querySelector('script[src*="widget.js"]');
  const orgId = (scriptTag && scriptTag.getAttribute('data-org-id')) || 'DEV_ORG_123';
  const apiUrl = (scriptTag && scriptTag.getAttribute('data-api-url')) || 'http://localhost:3000';

  // 1. Inject Styles
  const styles = `
      #noesis-widget-container {
          position: fixed;
          bottom: 12px;
          right: 16px;
          z-index: 999999;
          font-family: system-ui, -apple-system, sans-serif;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 12px;
          pointer-events: none;
      }
      #noesis-widget-container > * { pointer-events: auto; }
      #noesis-bubble {
          width: 60px;
          height: 60px;
          background: #2563eb;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
          color: white;
          position: relative;
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
          box-shadow: 0 25px 30px -5px rgba(0,0,0,0.2), 0 15px 15px -5px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          opacity: 0;
          pointer-events: none;
          transform: translateY(20px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid #e5e7eb;
      }
      @media (max-width: 480px) {
          #noesis-chat-window {
              width: calc(100vw - 32px);
              height: 500px;
              max-height: 70vh;
          }
      }
      #noesis-chat-window.noesis-open {
          opacity: 1;
          pointer-events: all;
          transform: translateY(0);
      }
      #noesis-header {
          background: #2563eb;
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
          background: #2563eb;
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
          border-color: #2563eb;
      }
      #noesis-send {
          background: #2563eb;
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
            #noesis-callout {
          background: white;
          color: #1e293b;
          padding: 8px 16px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          font-size: 0.85rem;
          font-weight: 500;
          white-space: nowrap;
          border: 1px solid #e2e8f0;
          pointer-events: none;
          transition: opacity 0.3s;
          opacity: 1;
          position: relative;
      }
      #noesis-callout::after {
          content: '';
          position: absolute;
          right: -6px;
          top: 50%;
          transform: translateY(-50%) rotate(45deg);
          width: 10px;
          height: 10px;
          background: white;
          border-right: 1px solid #e2e8f0;
          border-top: 1px solid #e2e8f0;
      }
      .noesis-hide {
          opacity: 0 !important;
          display: none !important;
      }
      #noesis-dismiss {
          position: absolute;
          top: -6px;
          right: -6px;
          width: 22px;
          height: 22px;
          background: white;
          color: #64748b;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          border: 1px solid #e2e8f0;
          transition: all 0.2s;
      }
      #noesis-dismiss:hover {
          color: #ef4444;
          border-color: #fecaca;
          transform: scale(1.1);
      }
      #noesis-dismiss svg {
          width: 12px;
          height: 12px;
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
      <div id="noesis-callout">Chat with me!</div>
      <div id="noesis-bubble">
          <div id="noesis-dismiss">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
          </div>
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
      document.getElementById('noesis-callout').classList.toggle('noesis-hide');
  };

  document.getElementById('noesis-dismiss').addEventListener('click', (e) => {
      e.stopPropagation();
      container.classList.add('noesis-hide');
  });

  bubble.addEventListener('click', toggleWindow);
  closeBtn.addEventListener('click', toggleWindow);

  const appendMessage = (text, sender) => {
      const msg = document.createElement('div');
      msg.className = 'noesis-msg ' + (sender === 'user' ? 'noesis-user' : 'noesis-bot');
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
          // Send the query to our secure Vercel serverless function
          const res = await fetch('/api/chat', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ query: text })
          });
          
          const data = await res.json();
          hideLoading();

          if (res.ok && data.answer) {
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
