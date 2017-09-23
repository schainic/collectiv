const USERS_CREATE = `
        CREATE TABLE IF NOT EXISTS Users (
            user_id SERIAL UNIQUE,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            account_id VARCHAR(255) NOT NULL,
            PRIMARY KEY (user_id)
        );
`;

const GROUPS_CREATE = `
        CREATE TABLE IF NOT EXISTS Groups (
            group_id SERIAL UNIQUE,
            group_name VARCHAR(255) NOT NULL,
            account_id VARCHAR(255) NOT NULL,
            PRIMARY KEY (group_id)
        );
`;

const GROUPS_USERS_CREAATE = `
        CREATE TABLE IF NOT EXISTS GroupsUsers (
            user_id INTEGER NOT NULL,
            group_id INTEGER NOT NULL,
            PRIMARY KEY (user_id, group_id),
			CONSTRAINT user FOREIGN KEY (user_id) REFERENCES users (user_id) MATCH SIMPLE ON DELETE CASCADE,
			CONSTRAINT group FOREIGN KEY (group_id) REFERENCES items (group_id) MATCH SIMPLE ON DELETE CASCADE
        );
`;

const FUNDS_CREATE = `
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