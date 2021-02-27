//あなたは銀行をシュミレーションするビデオゲームに機能を追加しています。
//この銀行はプレイヤーのお金を BankAccount で管理し、いくつかの機能を提供します。この銀行では、整数で表される、☦ という通貨によってお金が管理されます。
//☦1000 によってポテトチップス 1 袋購入できるとします。

class BankAccount{
  constructor(bankName, ownerName, savings, interestPerDay){
    this.bankName = bankName;
    this.ownerName = ownerName;
    this.savings = savings;
    this.interestPerDay = interestPerDay;
    this.maxWithdrawRate = 0.2;
  }

  showInfo(){
    return "bank: " + this.bankName + "\nowner name: " + this.ownerName + "\nbank account number: " + this.getRandomInteger(1, Math.pow(10, 8));
  }

  getRandomInteger(min, max){
    return Math.round(Math.random() * (max - min) + min);
  }

  depositMoney(depositAmount){
    if(this.savings <= 20000) this.savings -= 100;
    this.savings += depositAmount;
    return this.savings;
  }

  withdrawMoney(withdrawAmount){
    let moneyYouCanTake = (withdrawAmount > this.savings * this.maxWithdrawRate) ? this.savings * this.maxWithdrawRate : withdrawAmount;
    this.savings -= moneyYouCanTake;
    return moneyYouCanTake;
  }

  pastime(days){
    for(let i = 1; i <= days; i++){
      this.savings *= (1 + this.interestPerDay);
    }
    return this.savings;
  }
}

let user1 = new BankAccount("Chase", "Claire Simmons", 30000, 0.010001);
let user2 = new BankAccount("Bank Of America", "Remy Clay", 10000, 0.010001);
console.log(user1.showInfo());
console.log(user1.withdrawMoney(1000));
console.log(user1.depositMoney(10000));
console.log(user1.pastime(200));

console.log(user2.showInfo());
console.log(user2.withdrawMoney(5000));
console.log(user2.depositMoney(12000));
console.log(user2.pastime(500));

// Chase
// Claire Simmons
// 30000
// 0.010001

// Bank Of America
// Remy Clay
// 10000
// 0.010001