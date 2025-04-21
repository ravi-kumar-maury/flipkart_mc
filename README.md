Ecommerce with Loyalty Program - Machine Coding Round
Problem Statement:
Design a service that adds gamification elements to an e-commerce platform. This service will track user transactions, allowing users to purchase products, redeem existing points during purchases (with constraints based on user level), and earn new points from those purchases. The service should incentivize purchases and engagement using points and levels, and it should be designed to be flexible and extensible.
Functionalities Required:
Onboard User
Onboard user to our platform
onboard <user_name>

User Points:
Users earn points for every purchase.
The service calculates points based on the user's level and the purchase amount:
For every ₹100 spent, users earn points as follows:
Bronze: 10 points
Silver: 12.5 points
Gold: 15 points
Users can view their current point balance.

User Levels:
Users progress through levels based on accumulated points:
Bronze: 0 - 499 points
Silver: 500 - 999 points
Gold: 1000+ points
Each level has associated benefits (redemption limits and point earning rates).

Purchase Products with Points Redemption:
Users can purchase products.
Users can redeem existing points to pay for a portion of the purchase.
Redemption Rules:
The percentage of the purchase that can be paid with points and the capped limit on points redeemed are based on the user's level:
Bronze:
Maximum redemption percentage: 5% of the purchase amount.
Maximum points redeemable: 200 points.
Silver:
Maximum redemption percentage: 10% of the purchase amount.
Maximum points redeemable: 500 points.
Gold:
Maximum redemption percentage: 15% of the purchase amount.
Maximum points redeemable: 1000 points.
Users can choose to redeem less than or equal to points eligible for redemption
Users *also* earn points on the remaining amount paid with actual money (based on their level and the ₹100 = 10 points rule).
purchase <user_name> <order_amount> <points_to_redeem>

Get User’s Stats
User can choose to view below details
Current level, points

Personalized Discount (Bonus):
Calculate a personalized discount for each user on their current purchase based on their past purchase history.
Discount Calculation Rules:
If the user has placed more than 3 orders, apply a 5% discount on the current purchase.
If the user's total spending is greater than ₹10,000, apply a 10% discount on the current purchase.
If both conditions are true, apply a 12% discount on the current purchase.
The discount is applied *after* any point of redemption.
The discount should be capped at ₹5000.
Post redemption of this offer, eligibility will be refreshed (will again require at least 3 order or spent at least 10k to be re-eligible) 
Sample Test Cases:
Test Steps:
Bronze Purchase:
Input: purchase user1 800.00 0
Verify:
Points Calculation: (800 / 100) * 10 = 80 points
Output: Purchase successful. Points added: 80. Total payable amount: 800.00. Current points: 80. Current level: Bronze
orders count : 1
Bronze Purchase:
input: purchase user1 4200.00 100
Output: Purchase Failed. Not enough points to redeem
Bronze Purchase (Approaching Silver):
Input: purchase user1 4200.00 0
Verify:
Points Calculation: (4200 / 100) * 10 = 420 points
Output: Purchase successful. Points added: 420. Total payable amount: 4200.00. Current points: 500. Current level: Silver
orders count : 2
Silver Purchase (With Redemption):
Input: purchase user1 3000.00 300
Verify:
Redemption allowed: Yes (Silver max redemption: 500)
Amount after redemption: 3000 - 300 = 2700
Points Calculation: (2700 / 100) * 12.5 = 337.5 points
Output: Purchase successful. Points redeemed: 300. Points added: 337.5. Total payable amount: 2700.00. Current points: 537.5. Current level: Silver
orders count : 3



Silver Purchase (Approaching Gold):
Input: purchase user1 5000.00 0
Verify:
Points Calculation: (5000 / 100) * 12.5 = 625.0 points
Output: Purchase successful. Points added: 625.0. Total payable amount: 5000.00. Current points: 1162.5. Current level: Gold
orders count : 4
Gold Purchase (With Redemption, Discount): [BONUS PART]
*Assume user1 now qualifies for a 5% discount (orders > 3).
Input: purchase user1 12000.00 800
Verify:
Redemption allowed: Yes (Gold max redemption: 1000)
Amount after redemption: 12000 - 800 = 11200
Discount Calculation: 11200 * 0.05 = 560.0
Amount after discount: 11200 - 560 = 10640.0
Points Calculation: (10640 / 100) * 15 = 1596.0
Output: Purchase successful. Points redeemed: 800. Points added: 1596.0. Discount applied: ₹560.0. Total payable amount: 10640.0. Current points: 1958.5. Current level: Gold
orders count : 5
Final Points Check:
Input: getUserStats user1
Verify:
Output: user1 has 1958.5 points. Current level: Gold.
Guidelines:
Time: 90mins
Write modular and clean code. 
A driver program/main class/test case is needed to test out the code by the evaluator with multiple test cases. But do not spend too much time in the input parsing. Keep it as simple as possible.
Evaluation criteria:  Demoable & functionally correct code, Code readability, Proper Entity modelling, Modularity & Extensibility, Separation of concerns, Abstractions. Use design patterns wherever applicable
You are not allowed to use any external databases like MySQL. Use only in memory data structures.
No need to create any UX
Please focus on the Bonus Feature only after ensuring the required features are complete and demo-able.
Use of Gen AI or any other tool to write code is prohibited

