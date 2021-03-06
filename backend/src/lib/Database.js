const pg = require("pg");
const fs = require("fs");
const path = require("path");

import Config from "../config/Config.js"

class _Database {
    constructor() {
        this._connection = new pg.Pool(_pgConfig);
    }

    query(query, args) {
        return this._connection.query(query, args);
    }

    async _createTables() {
        _CREATES.forEach(async (query) => {
            await this.query(query);
        })
    }

    async _dropTables() {
        _TABLES.forEach(async (tableName) => {
            await this.query("DROP TABLE IF EXISTS $1 CASCADE;", [tableName]);
        });
    }
}

const _pgConfig = {
    user: Config.postgres.user,
    database: Config.postgres.database,
    password: Config.postgres.password,
    host: Config.postgres.host,
    port: Config.postgres.port,
    ssl: {
        rejectUnauthorized: false,
        key: fs.readFileSync(path.join(__dirname, "../config/", Config.postgres.ssl.key)).toString(),
        cert: fs.readFileSync(path.join(__dirname, "../config/", Config.postgres.ssl.cert)).toString()
    },
    max: 10,
    idleTimeoutMillis: 3000
}

const _TABLES = ["Users", "Groups", "GroupsUsers", "Funds"];

const _USERS_CREATE = `
        CREATE TABLE IF NOT EXISTS Users (
            user_id SERIAL UNIQUE,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            customer_id VARCHAR(255) NOT NULL,
            account_id VARCHAR(255) NOT NULL,
            PRIMARY KEY (user_id)
        );
`;

const _GROUPS_CREATE = `
        CREATE TABLE IF NOT EXISTS Groups (
            group_id SERIAL UNIQUE,
            group_name VARCHAR(255) NOT NULL,
            customer_id VARCHAR(255) NOT NULL,
            account_id VARCHAR(255) NOT NULL,
            PRIMARY KEY (group_id)
        );
`;

const _GROUPS_USERS_CREAATE = `
        CREATE TABLE IF NOT EXISTS GroupsUsers (
            user_id INTEGER NOT NULL,
            group_id INTEGER NOT NULL,
            PRIMARY KEY (user_id, group_id),
			FOREIGN KEY (user_id) REFERENCES Users (user_id) MATCH SIMPLE ON DELETE CASCADE,
			FOREIGN KEY (group_id) REFERENCES Groups (group_id) MATCH SIMPLE ON DELETE CASCADE
        );
`;

const _FUNDS_CREATE = `
        CREATE TABLE IF NOT EXISTS Funds (
            fund_id SERIAL UNIQUE,
            fund_name VARCHAR(255),
            master_user_id INTEGER NOT NULL,
            group_id INTEGER NOT NULL,
            balance FLOAT,
            PRIMARY KEY (fund_id),
			FOREIGN KEY (master_user_id) REFERENCES Users (user_id) MATCH SIMPLE ON DELETE SET NULL,
			FOREIGN KEY (group_id) REFERENCES Groups (group_id) MATCH SIMPLE ON DELETE SET NULL
        );
`;

const _CREATES = [_USERS_CREATE, _GROUPS_CREATE, _GROUPS_USERS_CREAATE, _FUNDS_CREATE];

const Database = new _Database();
export default Database;
