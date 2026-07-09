# Orion

> AI-powered PDF Chat Assistant built with the MERN Stack, Google Gemini, Pinecone, and Cloudinary.

Orion allows users to upload PDF documents, indexes them using Retrieval-Augmented Generation (RAG), and enables natural conversations with their documents using AI.

---

## Features

### Authentication
- User Registration & Login
- JWT Authentication
- Protected Routes
- HTTP-only Cookies

### Document Management
- Upload PDF documents
- Automatic text extraction
- Cloudinary storage
- Delete documents
- Document metadata stored in MongoDB

### AI Pipeline
- PDF Text Extraction
- Intelligent Text Chunking
- Google Gemini Embeddings
- Pinecone Vector Database
- Semantic Search
- Retrieval-Augmented Generation (RAG)

### Chat
- Chat with uploaded PDFs
- Conversation History
- Context-aware responses
- Source retrieval from relevant chunks

---

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- shadcn/ui
- React Router
- Axios
- React Hook Form
- Zod
- Lucide Icons

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Multer

### AI & Storage

- Google Gemini API
- Pinecone
- Cloudinary

---

## Project Structure

```
Orion
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   └── package.json
│
└── README.md
```

---

## Architecture

```
                Upload PDF
                     │
                     ▼
             Extract PDF Text
                     │
                     ▼
             Text Chunking
                     │
                     ▼
          Gemini Embeddings
                     │
                     ▼
         Pinecone Vector Store
                     │
                     ▼
             Semantic Search
                     │
                     ▼
        Relevant Context Chunks
                     │
                     ▼
             Gemini 2.5 Flash
                     │
                     ▼
               AI Response
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/orion.git
cd orion
```

---

### Backend

```bash
cd server
npm install
```

Create `.env`

```env
PORT=5000

MONGO_URI=

JWT_SECRET=

GEMINI_API_KEY=

PINECONE_API_KEY=
PINECONE_INDEX=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Run backend

```bash
npm run dev
```

---

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## Environment Variables

| Variable | Description |
|-----------|-------------|
| MONGO_URI | MongoDB Connection |
| JWT_SECRET | JWT Secret |
| GEMINI_API_KEY | Google Gemini API |
| PINECONE_API_KEY | Pinecone API Key |
| PINECONE_INDEX | Pinecone Index Name |
| CLOUDINARY_CLOUD_NAME | Cloudinary Cloud |
| CLOUDINARY_API_KEY | Cloudinary API Key |
| CLOUDINARY_API_SECRET | Cloudinary Secret |

---

## Current Status

### Completed

- Authentication
- Dashboard
- PDF Upload
- Cloudinary Integration
- PDF Text Extraction
- Text Chunking
- Embedding Generation
- Pinecone Integration
- AI Chat
- Conversation Management
- Document Management

### In Progress

- UI Polish
- Streaming AI Responses
- Improved Conversation History
- Chat Experience Improvements

---

## Future Improvements

- AI Streaming Responses
- Multi-document Chat
- OCR Support
- Drag & Drop Upload
- Dark / Light Theme
- Markdown Rendering
- Code Syntax Highlighting
- Citations with Source Preview
- Mobile Responsive Layout
- Search Across Conversations

---

## Screenshots

_Add project screenshots here._

---

## License

MIT License

---

## Author

**Veer Pratap Singh**

GitHub: https://github.com/Veer-ctrl
