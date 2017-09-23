const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

import AuthManager from "./lib/AuthManager.js";

class _Server {
    constructor() {
        this._server = express();

        this._initServer();
        this._initRoutes();
    }

    start(port = 8080) {
        this._server.listen(port, () => { console.log("Server running on port", port); });
    }

    _initServer() {
		// Server static files at ../../dist
		this._server.use(express.static(path.resolve(__dirname, "../..")));

		// Use cookie-parser
		this._server.use(cookieParser());

		// Use body-parser
		this._server.use(bodyParser.json());
		this._server.use(bodyParser.urlencoded({ extended:true }));

		// Use session
		let sessionConfig = {
			secret: Config.sessionSecret,
			resave: false,
			saveUninitialized: true
		}
		this._server.use(session(sessionConfig));

		// Use passport
		this._server.use(passport.initialize());
		this._server.use(passport.session());
    }

    _initRoutes() {
		this._server.post("/api/auth/signup", this._ensureNotAuthorized, AuthManager.signUp.bind(AuthManager));
		this._server.post("/api/auth/signin", this._ensureNotAuthorized, AuthManager.signIn.bind(AuthManager));
		this._server.post("/api/auth/signout", this._ensureAuthorized, AuthManager.signOut.bind(AuthManager));

		this._server.get("*", (request, response, next) => {
			response.sendFile(path.resolve(__dirname, "../../index.html"));
		});
    }
}

const Server = new _Server();
export default Server;
