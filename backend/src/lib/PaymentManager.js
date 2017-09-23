import Database from "./Database.js";
import CapitalOneApiManager from "./CapitalOneApiManager.js"
import UserManager from "./UserManager.js"
import GroupManager from "./GroupManager.js"


class _PaymentManager {

    constructor() {

    }

    makePaymentToFund(Group_id, Fund_id, Amount, User_id){
        let user = UserManager.GetUserInfo(User_id);
        let group = GroupManager.GetGroupInfo(Group_id);
        

        let newTransfer = await CapitalOneApiManager.CreateTransfer(group.account_id ,user.UserAccountNumber, Amount, "PAID TO " + user.name);
        Database.query("SELECT ")

    }
}


const FundManager = new _FundManager();
export default FundManager;