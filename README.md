# Shared Notebook

Shared Notebook is a collaborative platform for real-time note-taking, allowing multiple users to create, edit, and share notes efficiently. The project is structured as a monorepo, containing both the frontend and backend.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (React-based framework)
- **Backend**: [FastAPI](https://fastapi.tiangolo.com/) (High-performance API framework)
- **Database**: [MongoDB](https://www.mongodb.com/) (NoSQL document database)

## Features

- 🚀 **Real-Time Collaboration** – Multiple users can edit notes simultaneously.
- 🔒 **User Authentication** – Secure login and access control.
- 📂 **Organized Note Management** – Categorize, search, and tag notes.
- 🕒 **Version History** – View and revert changes to notes.
- 🌐 **Cross-Platform Access** – Works on desktops, tablets, and mobile devices.

---

## Installation

### Prerequisites

- Node.js (≥ 16)
- Python (≥ 3.8)
- MongoDB
- pymongo
- FastAPI

### Steps to Run Locally

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/sukantamajhi/shared-notebook.git
cd shared-notebook
```

#### 2️⃣ Backend Setup (FastAPI)

1. **Navigate to the backend directory**

   ```bash
   cd server
   ```

2. **Create a virtual environment**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**

   Create a `.env` file in the root directory and add the necessary configuration. Refer to `.env.example` for guidance.

5. **Start MongoDB**

   Ensure MongoDB is running locally or configure a remote connection.

6. **Run the FastAPI server**

   ```bash
   fastapi dev main.py --reload
   ```

   The API will be available at `http://127.0.0.1:8000/docs` (Swagger UI for testing endpoints).

---

#### 3️⃣ Frontend Setup (Next.js)

1. **Navigate to the frontend directory**

   ```bash
   cd ../client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file inside `client/` and configure it as follows:

   ```
   NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`.

---

## Contributing

1. **Fork the Repository**.
2. **Create a New Branch** (`git checkout -b feature-branch`).
3. **Make Changes and Commit** (`git commit -m "Description"`).
4. **Push to Your Branch** (`git push origin feature-branch`).
5. **Create a Pull Request**.

---

## License

This project is licensed under the MIT License.