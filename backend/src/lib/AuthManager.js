const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

class _AuthManager {
    constructor() {
		this._passport = passport;

		this._initPassport();
		this._initStrategies();
    }

    async _initPassport() {

    }

    async _initStrategies() {

    }
}

const AuthManager = new _AuthManager();
export default AuthManager;
