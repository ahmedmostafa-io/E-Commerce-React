🛒 React E-Commerce Store

A full-featured E-Commerce frontend built with _React, **Context API, and **Tailwind CSS_. This application consumes a real-world external API and offers a complete online shopping experience with modern UI and smooth user flow.

---

## 📸 Preview

![Ecommerce Preview](./public/Screenshot%202025-07-20%20135806.png)

---

## 🚀 Features

- 🔐 _Authentication_ using _JWT_ (Login / Register)
- 🛍 _Products Listing_ with:
  - Category Filtering
  - Search functionality
  - Sorting by price and rating
  - Pagination
- 🧺 _Shopping Cart_
  - Add/Remove/Update quantity
  - Auto-save cart in _LocalStorage_
- ❤ _Wishlist_ feature
- 📦 _Orders Page_ with history
- 💳 _Checkout Page_
- 🔔 _Toast Notifications_ for success/error messages
- 🎨 _Fully Responsive UI_ with Tailwind
- ⚙ Global state handled via _React Context API_

---

## 🛠 Tech Stack

| Technology        | Description                  |
| ----------------- | ---------------------------- |
| React             | Frontend library             |
| React Context API | State management             |
| Tailwind CSS      | Utility-first CSS framework  |
| Axios             | HTTP requests                |
| React Router      | Routing between pages        |
| React Hot Toast   | Toast notifications          |
| Formik + Yup      | Form handling and validation |

---

## 📂 Project Structure

```bash
src/
├── components/       # Shared and reusable UI components
├── context/          # Context providers (Auth, Cart, Wishlist, etc.)
├── pages/            # Main route pages
├── services/         # Axios API calls
├── utils/            # Helper utilities (e.g. price formatting)
├── App.jsx
└── main.jsx


---

🔗 API Used

> Route E-Commerce API
Base URL: https://ecommerce.routemisr.com/api/v1



Supports:

User authentication

Product listing

Cart operations

Wishlist & orders



---

⚙ How to Run

# Clone the repository
git clone https://github.com/ahmedmostafa-io/react-ecommerce-store.git

# Go to project directory
cd react-ecommerce-store

# Install dependencies
npm install

# Run development server
npm run dev


---

🧠 Learning Goals

This project helped in mastering:

Real-world API consumption

Using Context API for modular and scalable state management

Handling authentication via JWT tokens

Managing complex UI logic like filters, pagination, search

Improving user experience with local storage & notifications

Building reusable, clean, and responsive components



---

🙋‍♂ Author

Ahmed Mostafa Ahmed Abdel-Aal

📍 Cairo, Egypt

💼 Front-End Developer

🌐 [LinkedIn](https://www.linkedin.com/in/ahmed-mostafa-582378373/)

🐙 [GitHub](https://github.com/ahmedmostafa-io)
```
