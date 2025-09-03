# WanderStay
**WanderStay** is a full-stack web application inspired by Airbnb, where users can discover, create, and manage property listings.  
Built with **Node.js, Express, MongoDB Atlas, and Mongoose**. Deployed on **Render** for seamless hosting.

---

## ✨ Features
- 🔐 **Authentication** – Secure login & signup (JWT / Passport.js).
- 🏘 **Listings Management** – Create, read, update, and delete stays.
- 🖼 **Image Uploads** – Upload property images (Cloudinary support).
- ⭐ **Reviews & Ratings** – Users can leave reviews for listings.
- 🔎 **Search & Filters** – Find listings by location, price, or keywords.
- 📱 **Responsive UI** – Mobile-friendly front-end (EJS/React).
- ☁️ **Cloud Deployment** – Hosted on Render with MongoDB Atlas.
  
---

## 🛠 Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas (Mongoose ODM)
- **Frontend**: EJS (or React if you’ve integrated later)
- **Authentication**: JWT / Passport.js
- **File Uploads**: Multer + Cloudinary
- **Deployment**: Render

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```
git clone https://github.com/<your-username>/wanderstay.git
cd wanderstay

```
### 2️⃣ Install Dependencies
```
npm install


```
3️⃣Run Locally
```
npm install

```
📡 API Endpoints

🔹 Listings

| Method | Endpoint        | Description        |
| ------ | --------------- | ------------------ |
| GET    | `/listings`     | Get all listings   |
| POST   | `/listings`     | Create new listing |
| GET    | `/listings/:id` | Get single listing |
| PUT    | `/listings/:id` | Update listing     |
| DELETE | `/listings/:id` | Delete listing     |

🔹 Authentication

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| POST   | `/User/signup` | Register new user |
| POST   | `/User/login`  | Login user        |
| GET    | `/User/logout` | LogOut User       |

🔹 Reviews

| Method | Endpoint                          | Description             |
| ------ | --------------------------------- | ----------------------- |
| POST   | `/listings/:id/reviews`           | Add review to a listing |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete a review         |

```

🧪 Example Usage

Create a Listing

POST /listings
Content-Type: application/json

{
  "title": "Cozy Beach House",
  "location": "Goa, India",
  "price": 120,
  "country": "India"
}


Response

{
  "_id": "64f9c3...",
  "title": "Cozy Beach House",
  "location": "Goa, India",
  "price": 120,
  "country": "India",
  "createdAt": "2025-09-04T15:30:00.000Z"
}

```
🤝 Contributing

Contributions are welcome! To contribute:

Fork this repo.

Create a new branch (feature/your-feature).

Commit your changes.
```
Push to your fork and submit a PR.
