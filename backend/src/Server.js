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

    }

    _initRoutes() {

    }
}

const Server = new _Server();
export default Server;
