# 🔐 Odin File Uploader

A secure and modern file uploader web application that allows users to log in using their Google account and upload files to the server. Built using Node.js, Express, Multer, Passport (Google OAuth), Prisma ORM, and EJS templating.

---

## 🚀 Features

- ✅ Google OAuth 2.0 login via Passport.js
- ✅ Authenticated routes with session support
- ✅ File upload functionality using Multer
- ✅ Files saved in public/uploads and viewable via URL
- ✅ File metadata stored in a database via Prisma
- ✅ Clean, server-side rendered views using EJS
- ✅ Environment variables for secure configuration

---

## 💻 Tech Stack

| Layer            | Technology Used                     |
|------------------|-------------------------------------|
| Backend          | Node.js, Express.js                 |
| Authentication   | Passport.js (Google OAuth Strategy) |
| File Upload      | Multer                              |
| Templating       | EJS                                 |
| ORM / Database   | Prisma ORM, SQLite/PostgreSQL       |
| Session Handling | express-session                     |
| Env Management   | dotenv                              |

---

## 📂 Project Structure

odin-file-uploader/
│
├── index.js # Main server logic
├── .env # Environment config
├── /views # EJS templates
├── /public/uploads # Uploaded files (static)
├── /prisma # Prisma schema and migrations
├── /middleware # Authentication middleware
├── package.json # Project metadata and dependencies
└── .gitignore, .replit # Dev environment setup

yaml
Copy
Edit

---

## 🔐 Authentication Flow

1. User visits homepage and clicks **Login with Google**.
2. Passport.js handles the OAuth flow.
3. Upon success, user is redirected to the **dashboard**.
4. Session is created using `express-session`.

---

## 📁 File Upload Flow

1. User uploads a file via the dashboard form.
2. Multer saves the file to `public/uploads/`.
3. Prisma ORM stores the file name and user's email in the database.
4. Uploaded files are listed on the dashboard with public access links.

---

## 🧠 Prisma Schema (Example)

```prisma
model File {
  id        Int      @id @default(autoincrement())
  filename  String
  userEmail String
  uploaded  DateTime @default(now())
}
⚙️ Setup Instructions
Clone the repo

bash
Copy
Edit
git clone https://github.com/your-username/odin-file-uploader.git
cd odin-file-uploader
Install dependencies

bash
Copy
Edit
npm install
Create .env file

ini
Copy
Edit
PORT=3000
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_secret
SESSION_SECRET=your_session_secret
DATABASE_URL="file:./dev.db"  # Or PostgreSQL/MySQL URI
Prisma setup

bash
Copy
Edit
npx prisma generate
npx prisma migrate dev --name init
Run the app

bash
Copy
Edit
node index.js
📸 Screenshots
Include images of:

Login screen

Dashboard after login

File upload form

Uploaded file list with links

🛡️ Security Considerations
Sessions protect access to file uploads and dashboard.

File names are uniquely stored to avoid conflicts.

.env file hides all sensitive credentials.

Only authenticated users can access upload routes.

📌 Future Improvements
File deletion capability

User model and detailed tracking

Pagination for uploaded files

File size/type restrictions

UI improvements with Tailwind or Bootstrap

👤 Author
Prerana Bubbly
Full Stack Developer | Node.js | Java | Spring Boot
LinkedIn | GitHub

