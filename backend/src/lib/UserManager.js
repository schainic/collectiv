import Database from "./Database.js";


class _UserManager {

    constructor() {

    }

    GetUserInfo(User_id) {
        return Database.query(
            "SELECT user_id, name, email FROM Users WHERE user_id = $1", [User_id]);
    }
}


const UserManager = new _UserManager();
export default UserManager;