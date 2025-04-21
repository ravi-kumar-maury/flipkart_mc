const LEVELS = [
    { name: 'Bronze', minPoints: 0, maxPoints: 499, earnRateEvery100: 10, redeemPercent: 0.05, redeemCap: 200 },
    { name: 'Silver', minPoints: 500, maxPoints: 999, earnRateEvery100: 12.5, redeemPercent: 0.10, redeemCap: 500 },
    { name: 'Gold', minPoints: 1000, maxPoints: Infinity, earnRateEvery100: 15, redeemPercent: 0.15, redeemCap: 1000 }
  ];
  
  module.exports = LEVELS;
  