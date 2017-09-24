import Database from "./Database.js";
import UserManager from "./UserManager.js"
import GroupManager from "./GroupManager.js"
import PaymentManager from "./PaymentManager.js"

class _FundManager {
    constructor() {

    }

	addFund(request, response) {
		let user_id = request.user.user_id;
		let group_id = request.body.group_id;
		let fund_name = request.body.fund_name;

		Database.query("WITH new_fund AS (INSERT INTO Funds(fund_name, master_user_id, group_id, balance) VALUES($1, $2, $3, 0) RETURNING *) SELECT fund_id, fund_name, balance FROM new_fund", [fund_name, user_id, group_id]).then(result => {
			response.status(200).json({ ...result.rows[0] });
		});
	}

    transferToFund(request, response) {
        let user_id = request.user.user_id;
        let group_id = request.body.group_id;
        let fund_id = request.body.fund_id;
        let amount = request.body.amount;

        console.log(request.body);

        UserManager.GetUserInfo(user_id).then(user => {
            GroupManager.GetGroupInfo(group_id).then(group => {
                this.getFundInfo(fund_id).then(fund => {
                    PaymentManager.payToFund(group, fund, user, amount);

                    this.updateFundAmount(fund_id, amount).then(result => {
                        this.getFundInfo(fund_id).then(fund => {
                            response.status(200).message(fund);
                        });
                    });
                });
            });
        });
    }

    getFundInfo(Fund_id) {
        return Database.query(
            "SELECT * FROM Funds WHERE fund_id = $1", [Fund_id]);
    }

    updateFundAmount(fund_id, difference) {
        return Database.query("UPDATE Funds SET balance = balance + $1 WHERE fund_id = $2", [difference, fund_id]);
    }
}


const FundManager = new _FundManager();
export default FundManager;