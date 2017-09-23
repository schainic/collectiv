import Database from "./Database.js";


class _GroupManager {

    constructor() {

    }

    GetGroupInfo(Group_id) {
        return Database.query("SELECT * FROM Groups WHERE group_id = $1", [Group_id]);
    }

    GetUsersInGroup(Group_id) {
        return Database.query(`SELECT usr.user_id, usr.name, usr.email, usr.customer_id 
            FROM GroupUsers gpusr LEFT OUTER JOIN Users usr WHERE usr.user_id = gpusr.user_id
            WHERE group_id = $1`, [Group_id]);
    }

    GetFundsInGroup(Group_id) {
        return Database.query("SELECT * FROM Funds WHERE group_id = $1", [Group_id]);
    }



}


const GroupManager = new _GroupManager();
export default GroupManager;