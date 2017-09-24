import Database from "./Database.js";
import CapitalOneApiManager from './CapitalOneApiManager.js';

class _GroupManager {

    constructor() {

    }

    AddUserToGroup(request, response) {

        Database.query(
            `SELECT user_id
            WHERE Users.email = $1;`
            , [request.body.email]).then( result => {
                let newGroupsUsers = {
                    user_id: result.rows[0],
                    group_id: request.body.group_id
                    };

                    if(newGroupsUsers.user_id != null)
                    {
                        Database.query("INSERT INTO GroupsUsers (user_id, group_id) VALUES ($1, $2);",
                        [newGroupsUsers.group_id, newGroupsUsers.user_id]).then(GUresult => {

                            response.status(200);
                        });
                    }
                    else
                    {
                        response.status(500);
                    }

            });
    }

    GetGroupInfo(Group_id) {
        return Database.query("SELECT * FROM Groups WHERE group_id = $1", [Group_id]);
    }

    GetUsersInGroup(Group_id) {
        return Database.query(`SELECT usr.user_id, usr.name, usr.email, usr.customer_id
            FROM GroupUsers gpusr JOIN ON Users usr WHERE usr.user_id = gpusr.user_id
            WHERE group_id = $1`, [Group_id]);
    }

    GetFundsInGroup(Group_id) {
        return Database.query("SELECT * FROM Funds WHERE group_id = $1", [Group_id]);
    }

    GetGroupAndCollections(request, response) {
        Database.query(
            `SELECT usr.user_id, usr.name, usr.email, usr.customer_id
            FROM GroupsUsers gpusr
            LEFT OUTER JOIN Users usr ON usr.user_id = gpusr.user_id
            WHERE gpusr.group_id = $1;`
            , [request.query.id])
            .then(Uresult => {
                let Userresult = Uresult.rows;

                Database.query(
                    `SELECT fnds.fund_id, fnds.fund_name, fnds.balance
                    FROM Funds fnds
                    WHERE fnds.group_id = $1;`
                    , [request.query.id])
                    .then(Fresult => {
                       let Fundresult = Fresult.rows;

                        let totality = {
                            users: Userresult,
                            funds: Fundresult
                        }

                       response.status(200).json(totality);
                    });



               });
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

                Database.query(`WITH new_group AS (
                    INSERT INTO Groups (group_name, customer_id, account_id) VALUES ($1,$2,$3)
                    RETURNING group_id, group_name
                    ),
                    groups_users AS (
                    INSERT INTO GroupsUsers (group_id, user_id) VALUES ((SELECT group_id FROM new_group), $4)
                    )
                    SELECT group_id, group_name FROM new_group;`,[newGroup.group_name, newGroup.customer_id,newGroup.account_id, request.user.user_id])
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
