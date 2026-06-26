# AI Research Assistant

A full-stack AI-powered application that lets users upload PDF documents and ask questions about them using Retrieval Augmented Generation (RAG). Built with the MERN stack, LangChain.js, Google Gemini, and Pinecone.

---

## How It Works

1. User uploads a PDF
2. Text is extracted and split into chunks
3. Each chunk is converted to a vector embedding using Google Gemini
4. Embeddings are stored in Pinecone (vector database)
5. User asks a question
6. Question is embedded and semantically searched against Pinecone
7. Most relevant chunks are retrieved and sent to Gemini
8. Gemini generates a precise answer grounded in the document

---

## Tech Stack

**Frontend**
- React.js (Vite)
- Tailwind CSS
- Axios
- React Router DOM

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication (httpOnly cookies)
- Multer (file upload)
- pdf-parse (text extraction)

**AI Pipeline**
- LangChain.js
- Google Gemini API (`text-embedding` + `gemini-pro`)
- Pinecone (vector database)

---

## Project Structure

```
ai-research-assistant/
│
├── client/                         # React frontend
│   └── src/
│       ├── pages/                  # Route-level components
│       ├── components/             # Reusable UI components
│       ├── context/                # AuthContext
│       ├── hooks/                  # useAuth
│       └── services/               # Axios API wrappers
│
├── server/                         # Express backend
│   ├── config/                     # DB + Pinecone client setup
│   ├── controllers/                # Request handlers
│   ├── middleware/                 # Auth guard, upload handler
│   ├── models/                     # Mongoose schemas
│   ├── routes/                     # Express routers
│   ├── services/                   # PDF, chunk, embedding, vector logic
│   └── app.js                      # Express entry point
│
├── .env.example
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- Pinecone account
- Google AI Studio API key

### Installation

```bash
# Clone the repository
git clone https://github.com/Veer-ctrl/ai-research-assistant.git
cd ai-research-assistant

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Environment Variables

Copy `.env.example` to `.env` in the server directory and fill in your values:

```env
# Server
PORT=5001
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb+srv://...

# JWT
JWT_SECRET=your_long_random_secret_here
JWT_EXPIRES_IN=7d

# Google Gemini
GEMINI_API_KEY=your_gemini_api_key

# Pinecone
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX=ai-research-assistant
```

### Running the App

```bash
# Start backend (from /server)
npm run dev

# Start frontend (from /client)
npm run dev
```

Server runs on `http://localhost:5001`
Client runs on `http://localhost:5173`

---

## API Reference

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and receive JWT cookie |
| POST | `/api/auth/logout` | Clear auth cookie |
| GET | `/api/auth/me` | Get current user |

### Documents
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/documents/upload` | Upload and process a PDF |
| GET | `/api/documents` | List user's documents |
| GET | `/api/documents/:id` | Get single document |
| DELETE | `/api/documents/:id` | Delete document and all associated data |

### Search
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/search` | Semantic search across a document |

---

## RAG Pipeline

```
PDF Upload
    │
    ▼
pdf-parse → Extract raw text
    │
    ▼
RecursiveCharacterTextSplitter → Split into chunks (chunkSize: 1000, overlap: 200)
    │
    ▼
Google Gemini Embeddings → Convert each chunk to vector (3072 dimensions)
    │
    ▼
Pinecone → Upsert vectors (namespaced by documentId)
    │
    ▼
MongoDB → Save document + chunk metadata

──────────────────────────────────────

User Query
    │
    ▼
Google Gemini Embeddings → Embed the question
    │
    ▼
Pinecone → Search top 5 similar chunks in document namespace
    │
    ▼
Google Gemini LLM → Generate answer from retrieved context
    │
    ▼
Response → Grounded answer returned to user
```

---

## Security

- Passwords hashed with bcrypt
- JWT stored in httpOnly cookies (XSS protection)
- CSRF protection via sameSite cookie policy
- API keys stored server-side only — never exposed to client
- All document routes scoped to authenticated user
- File upload restricted to PDF only with 10MB size limit

---

## Development Phases

| Phase | Feature | Status |
|-------|---------|--------|
| 1 | Project setup & architecture | ✅ Complete |
| 2 | JWT authentication | ✅ Complete |
| 3 | PDF upload & text extraction | ✅ Complete |
| 4 | Text chunking & embeddings | ✅ Complete |
| 5 | Vector storage & semantic search | ✅ Complete |
| 6 | Gemini integration & RAG pipeline | 🔄 In Progress |
| 7 | Frontend UI | ⏳ Upcoming |
| 8 | End-to-end integration | ⏳ Upcoming |

---

## Author

**Veer** — [github.com/Veer-ctrl](https://github.com/Veer-ctrl)
