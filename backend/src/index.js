import Server from "./Server.js";
import Database from "./lib/Database.js";

Database._createTables();
Server.start();
