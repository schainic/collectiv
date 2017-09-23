const pg = require("pg");

import Config from "../config/Config.js"

class _Database {
    constructor() {
        this._connection = new pg.Pool(_pgConfig);
    }

    query(query, args) {
        return this._connection.query(query, args);
    }

    initSchema() {
    }
}

const _pgConfig = {
    user: Config.postgres.user,
    database: Config.postgres.database,
    password: Config.postgres.password,
    host: Config.postgres.host,
    port: Config.postgres.port,
    max: 10,
    idleTimeoutMillis: 3000
}

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
			CONSTRAINT user FOREIGN KEY (user_id) REFERENCES users (user_id) MATCH SIMPLE ON DELETE CASCADE,
			CONSTRAINT group FOREIGN KEY (group_id) REFERENCES items (group_id) MATCH SIMPLE ON DELETE CASCADE
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
			CONSTRAINT user FOREIGN KEY (master_user_id) REFERENCES users (user_id) MATCH SIMPLE ON DELETE SET NULL,
			CONSTRAINT group FOREIGN KEY (group_id) REFERENCES items (group_id) MATCH SIMPLE ON DELETE SET NULL
        );
`;

const Database = new _Database();
export default Database;
