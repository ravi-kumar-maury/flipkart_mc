const User = require('../models/User');
const { round } = require('../utils/formatter');

class LoyaltyService {
  constructor() {
    this.users = new Map();
  }

  onboard(name) {
    if (this.users.has(name)) {
      return `User ${name} already exists.`;
    }
    this.users.set(name, new User(name));
    return `User ${name} onboarded successfully.`;
  }

  getUserStats(name) {
    const user = this.users.get(name);
    if (!user) return `User ${name} not found.`;
    return `${name} has ${round(user.points)} points. Current level: ${user.getLevel().name}.`;
  }

  purchase(name, orderAmount, redeemPoints = 0) {
    if (orderAmount < 0) return 'order ammount can not be negative'
    const user = this.users.get(name);
    if (!user) return `User ${name} not found.`;

    const level = user.getLevel();
    if (redeemPoints > user.points) return 'Purchase Failed. Not enough points to redeem';

    const maxRedeemAmount = Math.min(orderAmount * level.redeemPercent, level.redeemCap);
    if (redeemPoints > maxRedeemAmount) {
      return `Purchase Failed. Max redeemable points for ${level.name} level is ${Math.floor(maxRedeemAmount)}.`;
    }

    let amountAfterRedemption = orderAmount - redeemPoints;
    let discount = 0;

    if (user.isDiscountEligible()) {
      discount = Math.min(amountAfterRedemption * user.getDiscountPercent(), 5000);
      user.resetDiscountEligibilityTrackers();
    }

    const finalAmount = amountAfterRedemption - discount;
    const pointsEarned = round((finalAmount / 100) * level.earnRateEvery100);

    user.points -= redeemPoints;
    user.points += pointsEarned;
    user.totalSpent += finalAmount;
    user.orderCount++;

    user.discountSpentTracker += finalAmount;
    user.discountOrderTracker++;

    user.purchases.push({ amount: orderAmount, redeemPoints, discount, finalAmount, pointsEarned });

    return `Purchase successful. Points redeemed: ${redeemPoints}. Points added: ${pointsEarned}.` +
           (discount ? ` Discount applied: ₹${round(discount)}.` : '') +
           ` Total payable amount: ${round(finalAmount)}. Current points: ${round(user.points)}. Current level: ${user.getLevel().name}.`;
  }
}

module.exports = LoyaltyService;
