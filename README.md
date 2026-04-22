# 🔐 Login System (Keycloak)

This project uses Keycloak to handle user login and security.

## 🧾 What this means

- Users can log in and log out safely  
- Passwords are not stored in this app  
- Access can be controlled (like admin or normal user)

## 🚀 How it works (Simple)

1. You click **Login**  
2. You are sent to a secure login page  
3. After entering your details, you come back to the app  
4. The app knows who you are and what you can access  

## 🛠️ What is needed

- A running Keycloak server (handles login)  
- A configured app connection (client)  
- Users created inside Keycloak  

## 🔑 Basic Setup (High-level)

- Create a realm (like a workspace)  
- Create a client (your app)  
- Add users (people who can log in)  
- Assign roles if needed (admin, employee, etc.)  

## ⚠️ Important

- This app depends on Keycloak to work  
- If Keycloak is down → login will not work  
- Always keep login details secure  
