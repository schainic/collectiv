const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

import Database from "./Database.js";
import CapitalOneApiManager from "./CapitalOneApiManager.js"

class _AuthManager {
    constructor() {
		this._passport = passport;

		this._initPassport();
		this._initStrategies();
    }

	signUp(request, response, next) {
		this._createUser(request.body).then((result) => {
			this.signIn(request, response, next);
		}).catch((err) => {
			response.status(500).json({ message: err });
			response.end();
		});
	}

	signIn(request, response, next) {
		this._passport.authenticate("local", (err, user, info) => {
			if (err) {
				response.status(500).json({ message: err });
				response.end();
				return;
			} else if (!user) {
				response.status(404).json({ message: "User not found" });
				response.end();
				return;
			}

			request.login(user, (err) => {
				if (err) {
					response.status(500).json({ message: err });
				} else {
					response.status(200).json({ message: "ok" });
				}
				response.end();
			});
		})(request, response, next);
	}

    async _initPassport() {
		this._passport.serializeUser((user, done) => {
			done(null, {
                user_id: user.user_id,
                name: user.name,
                email: user.email
			});
		});

		this._passport.deserializeUser(async (user, done) => {
			try {
				let result = await Database.query("SELECT * FROM Users WHERE user_id = $1 LIMIT 1;", [user.user_id]);

				if (result.rows.length) {
					let user = result.rows[0];
					done(null, { user_id: user.user_id, name: user.name, email: user.email });
				} else {
					done("User with given id doesn't exist", null);
				}

			} catch(e) {
				done(e, null);
			}
		});
	}
	
	async _createUser(json) {
		
		let newCustomer = CapitalOneApiManager.CreateCustomer(json.name, " ", "N/A", "N/A", "N/A", "N/A", "N/A");
		let newAccount = CapitalOneApiManager.CreateAccount(newCustomer._id);
	
		let newUser = {
			name: json.name,			
			email: json.email,
			password: bcrypt.hashSync(json.password, bcrypt.genSaltSync()),
			customer_id: newCustomer._id,
			account_id: newAccount._id,
			};
			
		let result = await Database.query("INSERT INTO users (name, email, password, customer_id, account_id) VALUES ($1, $2, $3, $4, $5);", 
		[newUser.name, newUser.email, newUser.password, newUser.customer_id, newUser.account_id]);
	};

    async _initStrategies() {
		const options = {
			usernameField: "email",
			passwordField: "password"
		}

		this._passport.use(new LocalStrategy(options, async (email, password, done) => {
			try {
				let result = await Database.query("SELECT * FROM Users WHERE email=$1 LIMIT 1;", [email]);

				if (result.rows.length) {
					let user = result.rows[0];

					if (this._checkPassword(password, user.password)) {
						return done(null, user);
					} else {
						return done("Wrong password", false);
					}
				} else {
					return done(null, false);
				}
			} catch(e) {
				return done(e, null);
			}
		}));
    }

	_checkPassword(password, hash) {
		return bcrypt.compareSync(password, hash);
	}
}

const AuthManager = new _AuthManager();
export default AuthManager;
