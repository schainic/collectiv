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

    /*
    const createPostQuery = `WITH data(user_id, created_at, type, title, content) AS (
VALUES ($1::INTEGER, $2::TIMESTAMPTZ , CHAR(1) 'p', $3::TEXT , $4::JSON)
),
item AS (
INSERT INTO items (user_id, created_at, type)
SELECT user_id, created_at, type FROM data
RETURNING user_id, id
),
insert_post AS (
INSERT INTO posts (id, title, content)
SELECT id, title, content
FROM data
JOIN item USING (user_id)
)
SELECT id FROM item;`; */

    async _CreateGroup(GroupName) {
        let newCustomer = await CapitalOneApiManager.CreateCustomer(GroupName, " ", "420", "HAM HOUSE", "Ann Arbor", "MI", "48104");
		let newAccount = await CapitalOneApiManager.CreateAccount(newCustomer.objectCreated._id, GroupName);

        let newGroup = {
            group_name: GroupName,
			customer_id: newCustomer.objectCreated._id,
			account_id: newAccount.objectCreated._id,
			};

        let result = `WITH group AS (
            INSERT INTO Groups (group_name, customer_id, account_id) VALUES ($1, $2, $3)
            RETURNING group_id
        ),
        WITH groups_users AS (
            INSERT INTO GroupsUsers (group_id, user_id) VALUES (group_id, $4)
            SELECT group_id FROM group
        )
        SELECT group_id FROM group;`

    }
    





}


const GroupManager = new _GroupManager();
export default GroupManager;