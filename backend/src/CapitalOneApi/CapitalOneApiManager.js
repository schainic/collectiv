class CapitalOneApiManager {
    constructor() {

    }


    CreateCustomer(FirstName, LastName, StreeNumber, StreetName, City, State, Zip)
    {
        let newcustomer = {
            "first_name": FirstName,
            "last_name": LastName,
            "address": {
                "street_number": StreeNumber,
                "street_name": StreetName,
                "city": City,
                "state": State,
                "zip": Zip
            }
        }




    }

}