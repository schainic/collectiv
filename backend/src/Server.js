const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

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
		// Use cookie-parser
		this._server.use(cookieParser());

		// Use body-parser
		this._server.use(bodyParser.json());
		this._server.use(bodyParser.urlencoded({ extended:true }));

		// Use session
		let sessionConfig = {
			secret: ServerConfig.sessionSecret,
			resave: false,
			saveUninitialized: true
		}
		this._server.use(session(sessionConfig));

		// Use passport
		this._server.use(passport.initialize());
		this._server.use(passport.session());
    }

    _initRoutes() {

    }
}

const Server = new _Server();
export default Server;
