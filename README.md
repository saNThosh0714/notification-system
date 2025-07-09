# Full-Stack Notification System - Angular + NestJS + MongoDB

This is a full-stack project with:

- Angular 17 frontend (with Material UI)
- NestJS backend (with Socket.IO & MongoDB)
- Real-time Notifications
- JWT Authentication

---

## Tech Stack

- **Backend:** NestJS, MongoDB (Mongoose), Socket.IO, JWT
- **Frontend:** Angular 17, Angular Material

---

### Project Structure

/socketio --> Backend (NestJS)
/frontend --> Frontend (Angular)

cd socketio
Install dependencies -- npm install

Update AppModule to use MongoDB directly (in app.module.ts)

In auth.service.ts or any JWT implementation, set the JWT secret directly:

Start the backend => npm run start:dev

cd ../frontend
Install dependencies -- npm install
Start the frontend => ng serve

Authentication
Uses JWT Tokens stored in browser localStorage

Token added to all outgoing HTTP requests using HttpInterceptor

Angular guards protect the dashboard routes

Notifications
Socket.IO setup for real-time updates

Angular listens to server-side events

Snackbar displays new project/user notification

Features
Create, update, delete users and projects

Real-time notification with WebSocket

Role-based UI (Admin/User)

Angular Material icons and tooltips

Author
Santhosh P
MEAN Stack Developer from Trichy
