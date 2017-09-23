import Database from "./Database.js";


class _FundManager {

    constructor() {

    }

    GetFundInfo(Fund_id) {
        return Database.query(
            "SELECT * FROM Funds WHERE fund_id = $1", [Fund_id]);
    }
}


const FundManager = new _FundManager();
export default FundManager;