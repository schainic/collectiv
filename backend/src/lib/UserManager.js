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
       

            try {
                let result = await Database.query(`SELECT * FROM
                GroupsUsers gpusr JOIN Groups grp ON grp.group_id = gpusr.group_id 
                WHERE gpusr.user_id = $1`
                , [User_id]);
            }
            catch(e){
                response.status(500).json({"Error":"Can't retrieve user's groups"});
            }


        response.status(200).json(result);


    }

    


}


const UserManager = new _UserManager();
export default UserManager;