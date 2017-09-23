import CapitalOneApiManager from '../CapitalOneApiManager.js';


let manager = CapitalOneApiManager;


//console.log(manager.GetCustomer("59c5b3c0a73e4942cdafddef"));
//console.log(manager.GetAccount("59c67a2bceb8abe24251bde7"));

console.log(manager.CreateCustomer("Sieu", "Nut", "427", "Hamilton", "AA", "MI", "48109"));
