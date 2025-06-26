# Rare: The Publishing Platform for the Discerning Writer

## Table of Contents
- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Setup Instructions](#setup-instructions)
  - [Backend (API)](#backend-api)
  - [Frontend (Client)](#frontend-client)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Frontend Usage](#frontend-usage)
- [Development Workflow](#development-workflow)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview
Rare is a full-stack publishing platform for writers and readers. Users can register, log in, create posts, manage tags and categories, and interact with content. The project is split into two main folders:

- **Rare-api-lfpewz**: Python backend using SQLite and a custom HTTP server.
- **Rare-client-lfpewz**: React frontend using fetch for API communication.

---

## Architecture

```
Rare-api-lfpewz/
│
├── models/         # Database logic (users, posts, tags, categories)
├── views/          # Business logic for each resource
├── request_handler.py  # Main HTTP server and routing
├── db.sqlite3      # SQLite database
└── loaddata.sql    # SQL for schema and seed data

Rare-client-lfpewz/
│
├── src/
│   ├── components/ # React components (auth, posts, tags, categories, nav)
│   ├── managers/   # API fetch logic
│   ├── services/   # Additional API helpers
│   └── Rare.js     # Main app entry
└── public/         # Static assets
```

---

## Setup Instructions

### Backend (API)

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Rare-api-lfpewz
   ```

2. **Set up Python environment**
   ```bash
   pipenv shell
   pipenv install
   ```

3. **Initialize the database**
   - Create `db.sqlite3` in the project root.
   - Run the SQL in `loaddata.sql` to create tables and seed data:
     ```bash
     sqlite3 db.sqlite3 < loaddata.sql
     ```

4. **Run the server**
   ```bash
   python request_handler.py
   ```
   The server will listen on `http://localhost:8088`.

### Frontend (Client)

1. **Navigate to the client folder**
   ```bash
   cd ../Rare-client-lfpewz
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the React app**
   ```bash
   npm start
   ```
   The app will open at `http://localhost:3000`.

---

## Database Schema

- **Users**: id, first_name, last_name, email, username, password, bio, is_staff, etc.
- **Posts**: id, user_id, category_id, title, content, image_url, publication_date, approved
- **Tags**: id, label
- **Categories**: id, label
- **PostTags**: id, post_id, tag_id
- **Reactions**, **Comments**, etc.

See `loaddata.sql` for full schema and example data.

---

## API Endpoints

| Method | Endpoint           | Description                       | Auth Required |
|--------|--------------------|-----------------------------------|--------------|
| POST   | /register          | Register a new user               | No           |
| POST   | /login             | Log in a user                     | No           |
| GET    | /posts             | Get all posts                     | No           |
| GET    | /posts/:id         | Get a single post                 | No           |
| POST   | /posts             | Create a new post                 | Yes (Token)  |
| PUT    | /posts/:id         | Update a post                     | Yes (Token)  |
| DELETE | /posts/:id         | Delete a post                     | Yes (Token)  |
| GET    | /tags              | Get all tags                      | No           |
| POST   | /tags              | Create a new tag                  | No           |
| PUT    | /tags/:id          | Update a tag                      | No           |
| DELETE | /tags/:id          | Delete a tag                      | No           |
| GET    | /categories        | Get all categories                | No           |

**Note:**
- For protected endpoints, send `Authorization: Token rare_token_user_<userId>` in headers.
- All endpoints return JSON. For 204 No Content, the response body is empty.

---

## Frontend Usage

- **Register/Login:**  
  User info is stored in localStorage under the key `rare_user` as `{ id: userId, is_staff: ... }`.
- **Navigation:**  
  NavBar shows/hides links based on login state.
- **Posts:**  
  Create, edit, delete, and view posts.
- **Tags/Categories:**  
  Manage tags and categories from their respective managers.
- **Authorization:**  
  When creating or modifying posts, the client sends the token in the Authorization header as `Authorization: Token rare_token_user_<userId>`.
- **Styling:**  
  The client uses [Bulma](https://bulma.io/documentation) for styling. Familiarize yourself with Bulma if you want to customize the UI.

---

## Development Workflow

- **Backend:**  
  Edit models in `models`, business logic in `views`, and routes in `request_handler.py`.  
  Restart the server after backend changes.

- **Frontend:**  
  Edit React components in `components`.  
  Edit API logic in `managers` or `services`.  
  Hot reload is enabled with `npm start`.

---

## Troubleshooting

### Common Issues

- **CORS errors:**  
  Ensure backend sends `Access-Control-Allow-Origin: *` and handles OPTIONS requests.

- **Empty responses or 500 errors:**  
  Check backend logs for Python exceptions.  
  Ensure all API endpoints return JSON (except 204 No Content).

- **Login/Register not working:**  
  Backend must return `{ valid: true, user_id: ..., is_staff: ... }` for successful login/register.  
  Frontend expects `rare_user` in localStorage as `{ id: userId, is_staff: ... }`.

- **Posts/tags/categories not displaying:**  
  Ensure backend returns arrays, not objects.  
  Check for correct API URLs and response shapes.

- **Token issues:**  
  Client must send `Authorization: Token rare_token_user_<userId>` for protected endpoints.  
  Backend must parse and validate the token.

### Debugging Tips

- Use browser DevTools Network tab to inspect API requests and responses.
- Use `console.log` in React and `print` in Python to debug data flow.
- Check the database with `sqlite3 db.sqlite3` if data is missing.
- If you get a 400/500 error, check the backend logs for tracebacks.
- If you get a CORS error, make sure your backend is running and sending the correct headers.

---

## Contributing

1. Fork the repo and create a feature branch.
2. Make your changes with clear commit messages.
3. Test both backend and frontend.
4. Submit a pull request with a description of your changes.

---

## License

MIT License. See LICENSE for details.

