const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");

import Config from "./config/Config.js";
import AuthManager from "./lib/AuthManager.js";
import GroupManager from "./lib/GroupManager.js";

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
			secret: Config.secret,
			resave: false,
			saveUninitialized: true
		}
		this._server.use(session(sessionConfig));

		// Use passport
		this._server.use(passport.initialize());
		this._server.use(passport.session());
    }

    _initRoutes() {
		this._server.post("/api/auth/signup", AuthManager.signUp.bind(AuthManager));
		this._server.post("/api/auth/signin", AuthManager.signIn.bind(AuthManager));
        this._server.get("/api/auth/me", AuthManager.me.bind(AuthManager));
		// this._server.post("/api/auth/signout", AuthManager.signOut.bind(AuthManager));

		this._server.get("/api/groups", GroupManager.GetUsersInGroup.bind(GroupManager));

		this._server.get("*", (request, response, next) => {
			response.sendFile(path.resolve(__dirname, "../../index.html"));
		});
    }
}

const Server = new _Server();
export default Server;
