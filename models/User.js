const LEVELS = require('../constants/levels');

class User {
    constructor(name) {
      this.name = name;
      this.points = 0;
      this.orderCount = 0;
      this.totalSpent = 0;
      this.purchases = [];
      this.discountSpentTracker = 0;
      this.discountOrderTracker = 0;
    }
  
    getLevel() {
      for (let level of LEVELS) {
        if (this.points >= level.minPoints && this.points <= level.maxPoints) return level;
      }
    }
  
    isDiscountEligible() {
      const condition1 = this.discountOrderTracker > 3;
      const condition2 = this.discountSpentTracker > 10000;
      return condition1 || condition2;
    }
  
    getDiscountPercent() {
      const condition1 = this.orderCount > 3;
      const condition2 = this.totalSpent > 10000;
      if (condition1 && condition2) return 0.12;
      if (condition2) return 0.10;
      if (condition1) return 0.05;
      return 0;
    }
  
    resetDiscountEligibilityTrackers() {
      this.discountSpentTracker = 0;
      this.discountOrderTracker = 0;
    }
  }

module.exports = User;