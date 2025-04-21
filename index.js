const LoyaltyService = require('./services/LoyaltyService');

const service = new LoyaltyService();

console.log(service.onboard('user1'));
console.log(service.purchase('user1', 800, 0));
console.log(service.purchase('user1', 4200, 100)); //not enough points
console.log(service.purchase('user1', 4200, 0)); //Silver
console.log(service.purchase('user1', 3000, 300)); //Silver with redemption
console.log(service.purchase('user1', 5000, 0)); //Gold
console.log(service.purchase('user1', 12000, 800)); //Gold with redemption + discount
console.log(service.getUserStats('user1'));

console.log('**********************************')

console.log(service.onboard('user2'));
console.log(service.purchase('user2', 10000, 0)); // gold
console.log(service.getUserStats('user2'));
console.log(service.purchase('user2', 4200, 600)); //not enough points
console.log(service.getUserStats('user2'));
