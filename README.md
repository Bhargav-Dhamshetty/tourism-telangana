# Telangana Tourism
A dynamic travel website featuring famous places in Telangana. The platform includes user authentication, detailed travel information, reviews, and interactive features to enhance the travel experience.

## Features

### Frontend
#### User Authentication
- Users can register and log in.
- Secure authentication with role-based access control.

#### Travel Dashboard
- Display a list of famous tourist spots with search and filter options.
- Categorized places for easy exploration.

#### Reviews & Engagement
- Users can add reviews and rate tourist spots.
- Real-time updates for new reviews and interactions.

#### Interactive Features
- Image carousel with auto-slide and manual controls.
- Navigation button to open Google Maps with the selected location.

#### Responsive Design
- Optimized for desktops, tablets, and mobile devices.

### Backend
#### Authentication API
- Secure user login and registration using JWT.

#### Travel Management API
- CRUD operations for adding, updating, and deleting tourist spot details.
- Efficient data handling for user reviews and ratings.

#### Real-Time Updates
- WebSockets for instant review and rating updates.

### Database
- User, place, and review data stored efficiently in *MongoDB Atlas*.

## Deployment

### Frontend Hosting
- Deployed on *Vercel* for free-tier hosting.

### Backend Hosting
- Deployed on *Render* for free-tier hosting.

### Database
- *MongoDB Atlas* (Free Plan) is used for database hosting.

## Setup Instructions

### Prerequisites
- Node.js installed on your machine.
- MongoDB Atlas account for the database.

### Steps to Run Locally
1. Clone the repository:
   ```sh
   git clone https://github.com/Bhargav-Dhamshetty/tourism-telangana.git
   cd tourism-telangana
   ```
   
2. Install dependencies for both frontend and backend:
   ```sh
   npm install
   ```
   
3. Set up environment variables:
   - Create a `.env` file and configure database and authentication settings.

4. Start the development server:
   ```sh
   npm start
   ```
   
5. Open your browser and visit `http://localhost:3000` to access the application.
