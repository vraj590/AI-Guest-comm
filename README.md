# SuiteOp AI Guest Communications Hub

## Project Structure

```
suiteop-hub/
├── backend/
│   ├── main.py               ← FastAPI app entry point
│   ├── config.py             ← Env vars (API key, URLs)
│   ├── db.py                 ← SQLite connection + init
│   ├── requirements.txt
│   └── routes/
│       ├── property.py       ← GET/PUT property config
│       ├── messaging.py      ← POST guest message → Gemini → response
│       └── conversations.py  ← GET/DELETE conversation history
│
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── main.jsx          ← React entry point
        ├── App.jsx           ← Root component + tab routing
        ├── api.js            ← All fetch calls to backend
        ├── constants.js      ← Sentiment/severity configs, demo messages
        ├── components/
        │   ├── Header.jsx        ← Top nav bar
        │   ├── Badge.jsx         ← Reusable sentiment/severity badge
        │   ├── ChatPanel.jsx     ← Live chat UI
        │   ├── PropertySetup.jsx ← Property config form
        │   └── HistoryPanel.jsx  ← Conversation history list
        ├── hooks/
        │   ├── useProperty.js    ← Property fetch/save state
        │   ├── useChat.js        ← Chat messages + send logic
        │   └── useHistory.js     ← History fetch/clear logic
        └── styles/
            ├── global.css            ← Fonts, reset, keyframes
            ├── components.module.css ← Header styles
            ├── chat.module.css       ← Chat panel styles
            ├── setup.module.css      ← Property form styles
            └── history.module.css    ← History panel styles
```

---

## Setup

### Backend

```bash
cd backend
pip install -r requirements.txt
export GEMINI_API_KEY=your_key_here
uvicorn main:app --reload --port 8000
```

API docs: `http://localhost:8000/docs`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at: `http://localhost:3000`

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/property/1` | Get property config |
| PUT | `/property/1` | Update property config |
| POST | `/message` | Guest message → AI response |
| GET | `/conversations/1` | Get conversation history |
| DELETE | `/conversations/1` | Clear history |
