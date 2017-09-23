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

     CreateGroup(request, response) {
        CapitalOneApiManager.CreateCustomer(request.body.group_name, " ", "420", "HAM HOUSE", "Ann Arbor", "MI", "48104").then(Cresult => {
            let newCustomer = Cresult;
            CapitalOneApiManager.CreateAccount(newCustomer.objectCreated._id, request.body.group_name).then(Aresult => {
                let newAccount = Aresult;
                let newGroup = {
                    group_name: request.body.group_name,
                    customer_id: newCustomer.objectCreated._id,
                    account_id: newAccount.objectCreated._id,
                    };
        
                let result = Database.query(`WITH new_group AS (
                    INSERT INTO Groups (group_name, customer_id, account_id) VALUES ($1,$2,$3)
                    RETURNING group_id
                    ),
                    groups_users AS (
                    INSERT INTO GroupsUsers (group_id, user_id) VALUES ((SELECT group_id FROM new_group), $4)
                    )
                    SELECT group_id FROM new_group;`,[newGroup.group_name, newGroup.customer_id,newGroup.account_id, request.user.user_id])
                    .then(result => {
                        Qresult = result.rows[0];   
                        response.status(200).json(Qresult);
                       });
        
            })


        });
      
    }
    





}


const GroupManager = new _GroupManager();
export default GroupManager;