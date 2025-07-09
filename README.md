# 📚 Minimal Library Management System

A clean and functional **frontend application** for managing a library, built with **React**, **Redux Toolkit Query (RTK Query)**, and **TypeScript**. This project is focused on core book and borrowing features and interacts seamlessly with a RESTful API. It does **not** include authentication, category filters, or payment integration, keeping things minimal and efficient.

---

## 🚀 Features

### 📘 Book Management

- **View All Books** in a responsive table layout.
- **Add Book** form with fields:
  - Title, Author, Genre, ISBN, Description, Copies, and Availability (defaults to true).
- **Edit Book**:
  - Opens a form pre-filled with existing book data.
  - On submission, updates are reflected immediately in the UI.
  - If `copies` is set to `0`, the book is marked as **unavailable**.
- **Delete Book**:
  - Includes confirmation before deletion.
- **Borrow Book**:
  - Allows users to borrow available copies of a book.

### 🔄 Borrowing Flow

- Users can **borrow books** via a form from the book list.
- Fields:
  - Quantity (must not exceed available copies)
  - Due Date
- Submits to API and automatically updates availability.
- Redirects to **Home** on success.

### 📊 Borrow Summary

- Aggregated view of borrowed books:
  - Columns: Book Title, ISBN, Total Quantity Borrowed.
- Retrieved via aggregation API endpoint.

---

## 🧩 Tech Stack

- **React** (with functional components and hooks)
- **Redux Toolkit Query (RTK Query)** for API interactions
- **TypeScript** for type safety
- **Tailwind CSS / Shadcn UI** (assumed for styling if used)

---

## 🧪 How to Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev

```

## 🎯 Goals

- Demonstrate core CRUD operations and borrowing logic
- Showcase usage of RTK Query and React best practices
- Provide a minimal yet functional library interface
