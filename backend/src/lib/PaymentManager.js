import Database from "./Database.js";
import CapitalOneApiManager from "./CapitalOneApiManager.js"
import UserManager from "./UserManager.js"
import GroupManager from "./GroupManager.js"

class _PaymentManager {

    constructor() {

    }

    payToFund(group, fund, user, amount){
        return CapitalOneApiManager.CreateTransfer(group.account_id, user.account_number, amount, "PAID TO " + fund.fund_name);

        let user_id = request.body.user_id;
        let fund_id = request.body.fund_id;
        let amount = request.body.amount;

        UserManager.GetUserInfo(user_id).then(user => {
            CapitalOneApiManager.CreateTransfer(group.account_id ,user.UserAccountNumber, Amount, "PAID TO " + user.name).then(result => {
                FundManager.updateFundAmount(fund_id, amount).then(result => {
                    response.status(200).message({ message: "Fund transfered" });
                });
            });
        });
    }
}

const FundManager = new _FundManager();
export default FundManager;