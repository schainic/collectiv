const path = require("path");
const fs = require("fs");

import cloneDeep from "lodash/cloneDeep"

const CONF_PATH = path.join(__dirname, "Config.json");

class _Config {
    constructor() {
        let config = JSON.parse(fs.readFileSync(CONF_PATH));

        this._capitalOne = config.CapitalOne;
        this._postgres = config.Postgres;
        this._secret = config.Secret;
    }

    get capitalOne() {
        return cloneDeep(this._capitalOne);
    }

    get postgres() {
        return cloneDeep(this._postgres);
    }
}

const Config = new _Config();
export default Config;
