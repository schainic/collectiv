import Database from "./Database.js";
import CapitalOneApiManager from "./CapitalOneApiManager.js"
import UserManager from "./UserManager.js"
import GroupManager from "./GroupManager.js"

class _PaymentManager {
    constructor() {

    }

    payToFund(group, fund, user, amount){
        return CapitalOneApiManager.CreateTransfer(group.account_id, user.account_number, amount, "PAID TO " + fund.fund_name);
    }
}

const PaymentManager = new _PaymentManager();
export default PaymentManager;