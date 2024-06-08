
# HACK HUNTER - The Cyber Battle Arena

The HACK HUNTER is a web application designed for hosting Capture The Flag (CTF) competitions for universities and societies. It utilizes ReactJS for the frontend, and ExpressJS with Node.js and MongoDB for the backend.

## Installation

Clone the repository and navigate into the project directory:

```bash
git clone https://github.com/reshangayantha9/ctf-platform
cd <repository-folder>
```

### Backend Setup

1. Navigate to the backend folder:

    ```bash
    cd backend
    ```

2. Create a `.env` file in the `backend` directory and add the following environment variables:

    ```plaintext
    DB="Your mongodb url"
    PORT="Port Number"
    TOKEN_KEY="JWT Token"
    CLIENT_URL=http://localhost:3000
    ```

3. Install the backend dependencies and start the server:

    ```bash
    npm install
    npm start
    ```

### Client Setup

1. Navigate to the client folder:

    ```bash
    cd ../client
    ```

2. Create a `.env` file in the `client` directory and add the following environment variables:

    ```plaintext
    REACT_APP_BASE_URL=http://localhost:8000/api
    REACT_APP_SOCKET_URL=http://localhost:8000
    ```

3. Install the client dependencies and start the application:

    ```bash
    npm install
    npm start
    ```

## Usage

- Visit `http://localhost:3000` in your web browser to access **HACK HUNTER**.
- Explore the CTF challenges and participate in competitions.
- Monitor leaderboards and enjoy the cybersecurity challenges!

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
