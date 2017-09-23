import Database from "./Database.js";


class _UserManager {

    constructor() {

    }

    GetUserInfo(User_id) {
        return Database.query(
            "SELECT * FROM Users WHERE user_id = $1", [User_id]);
    }

     GetUsersGroups(request, response) {
        let User_id = request.user.user_id;
        let Qresult = {};

            try {
                Database.query(`SELECT Groups.group_id, Groups.group_name FROM
                GroupsUsers JOIN Groups ON Groups.group_id = GroupsUsers.group_id 
                WHERE GroupsUsers.user_id = $1`
                , [User_id]).then(result => {
             Qresult = result.rows;   
             response.status(200).json(Qresult);
             
            });
              
            }
            catch(e){
                console.log(Qresult);
                
                response.status(500).json({"Error":"Can't retrieve user's groups"});
            }
            console.log(Qresult);
            



    }

    


}


const UserManager = new _UserManager();
export default UserManager;