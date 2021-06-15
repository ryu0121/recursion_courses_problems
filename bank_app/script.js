function displayNone(ele){
  ele.classList.remove("d-block");
  ele.classList.add("d-none");
}

function displayBlock(ele){
  ele.classList.remove("d-none");
  ele.classList.add("d-block");
}

const config = {
  initialForm: document.getElementById("initial-form"),
  bankPage: document.getElementById("bankPage"),
  sidePage: document.getElementById("sidePage"),
  confirmPage: document.getElementById("confirmPage"),
}

class BankAccount{
  constructor(firstName, lastName, email, type, accountNumber, money){
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.type = type;
    this.accountNumber = accountNumber;
    this.money = money;
    this.initialDeposit = money;
  }

  getFullName(){
    return this.firstName + " " + this.lastName;
  }

  calculateWithdrawAmount(amount){
    return (amount <= this.money * 0.2) ? amount : Math.floor(this.money * 0.2);
  }

  withdrawMoney(withdrawnAmount){
    this.money -= withdrawnAmount;
  }

  depositMoney(depositedAmount){
    this.money += depositedAmount;
  }

  increaseMoneyByInterest(days, interest){
    this.money = Math.floor(this.money * days/365 * interest);
  }
}

function initializeUserAccount(){
  const form = document.getElementById('bank-form');
  const user = new BankAccount(
    form.querySelectorAll(`input[name="firstName"]`).item(0).value,
    form.querySelectorAll(`input[name="lastName"]`).item(0).value,
    form.querySelectorAll(`input[name="email"]`).item(0).value,
    form.querySelectorAll(`input[name="accountType"]`).item(0).value,
    getRandomInteger(1, Math.pow(10,8)),
    parseInt(form.querySelectorAll(`input[name="deposit"]`).item(0).value)
  )
  displayNone(config.initialForm);
  displayBlock(config.bankPage);
  config.bankPage.append(mainBankPage(user));
}

function getRandomInteger(min, max){
  return Math.floor((max-min) * Math.random() + min)
}

function mainBankPage(user){
  let infoEle = document.createElement("div");
  infoEle.classList.add("text-right");
  let nameP = document.createElement("p");
  nameP.classList.add("py-1", "mb-0");
  let bankIDP = nameP.cloneNode(true);
  let initialDepositP = nameP.cloneNode(true);
  nameP.innerHTML = user.getFullName();
  bankIDP.innerHTML = user.accountNumber;
  initialDepositP = user.initialDeposit;
  infoEle.append(nameP, bankIDP, initialDepositP);

  let depositEle = document.createElement("div");
  depositEle.classList.add("d-flex", "bg-danger", "py-2", "mt-2");
  depositTitleP = document.createElement("h3");
  depositTitleP.classList.add("col-6", "text-left", "text-white");
  depositP = document.createElement("h3");
  depositP.classList.add("col-6", "text-right", "text-white");
  depositTitleP.innerHTML = "預金";
  depositP.innerHTML = `$${user.money}`;
  depositEle.append(depositTitleP, depositP);

  let selectionEle = document.createElement("div");
  selectionEle.classList.add("d-flex", "justify-content-around", "align-items-center", "flex-wrap", "text-center", "text-white", "pt-3");
  selectionEle.innerHTML
    = `
        <div id="withdrawal" class="col-12 col-md-3 bg-blue hover px-0 py-2 mt-2">
          <h3>引き出し</h3>
          <i class="fas fa-wallet fa-3x"></i>
        </div>
        <div id="deposit" class="col-12 col-md-3 bg-blue hover px-0 py-2 mt-2">
          <h3>入金</h3>
          <i class="fas fa-coins fa-3x"></i>
        </div>
        <div id="comeBackLater" class="col-12 col-md-3 bg-blue hover px-0 py-2 mt-2">
          <h3>運用</h3>
          <i class="fas fa-home fa-3x"></i>
        </div>
      `

  selectionEle.querySelectorAll("#withdrawal").item(0).addEventListener("click", function(){
    sideBankSwitch();
    config.sidePage.append(withdrawPage(user));
  })
  selectionEle.querySelectorAll("#deposit").item(0).addEventListener("click", function(){
    sideBankSwitch();
    config.sidePage.append(depositPage(user));
  })
  selectionEle.querySelectorAll("#comeBackLater").item(0).addEventListener("click", function(){
    sideBankSwitch();
    config.sidePage.append(comeBackLater(user));
  })

  let container = document.createElement("div");
  container.append(infoEle, depositEle, selectionEle);
  return container;
}

function sideBankSwitch(){
  displayNone(config.bankPage);
  displayBlock(config.sidePage);
  config.bankPage.innerHTML = "";
  config.sidePage.innerHTML = "";
}

function bankReturn(){
  displayNone(config.sidePage);
  displayBlock(config.bankPage);
  config.sidePage.innerHTML = "";
  config.bankPage.innerHTML = "";
}

function withdrawPage(user){
  let container = document.createElement("div");
  container.append(billInputSelector("引き出す額を入力してください"));
  container.append(backNextButton("戻る", "次へ"));

  let billInputs = container.querySelectorAll(".bill-input");
  let totalEle = container.querySelectorAll("#withdrawTotal").item(0);
  billInputs.forEach(billInput => {
    billInput.addEventListener("change", function(){
      totalEle.innerHTML = `$${billSummation(billInputs, "data-bill")}`;
    })
  })

  container.querySelectorAll("#pageBack").item(0).addEventListener("click", function(){
    bankReturn();
    config.bankPage.append(mainBankPage(user));
  });
  container.querySelectorAll("#pageNext").item(0).addEventListener("click", function(){
    const totalAmount = parseInt(billSummation(billInputs, "data-bill"));
    if(totalAmount === 0) alert("引き出し額を入力してください");
    else {
      displayNone(config.sidePage);
      displayBlock(config.confirmPage);
      config.confirmPage.append(billDialog(user, totalAmount));
    }
  });

  return container;
}

function billInputSelector(title){
  let billInputEle = document.createElement("div");
  billInputEle.innerHTML =
  `
    <h3 class="text-center">${title}</h3>
    <div class="d-flex align-items-center justify-content-center flex-column">
      <form>
        <div class="form-group d-flex my-2 align-items-center">
          <label for="moneyWithdraw100" class="col-3">$100</label>
          <input type="number" class="form-control col-9 bill-input" placeholder="0" data-bill="100">
        </div>
        <div class="form-group d-flex my-2 align-items-center">
          <label for="moneyWithdraw50" class="col-3">$50</label>
          <input type="number" class="form-control col-9 bill-input" placeholder="0" data-bill="50">
        </div>
        <div class="form-group d-flex my-2 align-items-center">
          <label for="moneyWithdraw20" class="col-3">$20</label>
          <input type="number" class="form-control col-9 bill-input" placeholder="0" data-bill="20">
        </div>
        <div class="form-group d-flex my-2 align-items-center">
          <label for="moneyWithdraw10" class="col-3">$10</label>
          <input type="number" class="form-control col-9 bill-input" placeholder="0" data-bill="10">
        </div>
        <div class="form-group d-flex my-2 align-items-center">
          <label for="moneyWithdraw5" class="col-3">$5</label>
          <input type="number" class="form-control col-9 bill-input" placeholder="0" data-bill="5">
        </div>
        <div class="form-group d-flex my-2 align-items-center">
          <label for="moneyWithdraw1" class="col-3">$1</label>
          <input type="number" class="form-control col-9 bill-input" placeholder="0" data-bill="1">
        </div>
        <div class="bg-blue mb-2 p-3">
          <p id="withdrawTotal" class="text-center text-white m-0">$0.00</p>
        </div>
      </form>
    </div>
  `;
  return billInputEle;
}

function backNextButton(backString, nextString){
  let container = document.createElement("div");
  container.classList.add("d-flex", "justify-content-between");
  container.innerHTML =
  `
    <button id="pageBack" type="submit" class="btn btn-outline-danger col-5">${backString}</button>
    <button id="pageNext" type="submit" class="btn btn-primary col-5">${nextString}</button>
  `;
  return container;
}

function billSummation(billInputs, billAttribute){
  let total = 0;
  billInputs.forEach(billInput => {
    const bill = parseInt(billInput.getAttribute(billAttribute));
    total += (billInput.value === "") ? 0 : (bill * parseInt(billInput.value));
  }, 0);
  return total.toString();
}

function billDialog(user, total){
  let container = document.createElement("div");
  container.classList.add("col-md-7");
  container.innerHTML = `<h3>確認</h3>`;
  
  let totalToBeWithdrawn = document.createElement("div");
  let withdrawnAmount = user.calculateWithdrawAmount(total);
  totalToBeWithdrawn.classList.add("bg-danger", "col-12", "d-flex", "justify-content-between", "mb-2");
  totalToBeWithdrawn.innerHTML =
  `
    <p class="my-1">引き出せる金額</p>
    <p class="my-1">$${withdrawnAmount}</p>
  `
  container.append(billPSummation(), totalToBeWithdrawn, backNextButton("戻る", "決定"));

  container.querySelectorAll("#pageBack").item(0).addEventListener("click", function(){
    displayNone(config.confirmPage);
    displayBlock(config.sidePage);
    config.confirmPage.innerHTML = ``;
    config.sidePage.innerHTML = ``;
    config.sidePage.append(withdrawPage(user));
  });
  container.querySelectorAll("#pageNext").item(0).addEventListener("click", function(){
    if(withdrawnAmount === 0) alert("引き出せる額を入力してください");
    else {
      displayNone(config.confirmPage);
      displayBlock(config.bankPage);
      config.sidePage.innerHTML = ``;
      config.confirmPage.innerHTML = ``;
      user.withdrawMoney(withdrawnAmount);
      config.bankPage.append(mainBankPage(user));
    }
  });

  return container;
}

function billPSummation(){
  let container = document.createElement("div");
  container.classList.add("bg-blue", "col-12", "py-2", "my-2", "text-white");
  container.setAttribute("id", "billDialog");

  let billInputs = document.querySelectorAll(".bill-input");
  let billsHtml = ``;
  billInputs.forEach(billInput => {
    if(billInput.value != ""){
      billsHtml += 
      `
        <div class="border col-12 border-warning">
          <p class="p-2 mb-1">${billInput.value} × $${billInput.getAttribute("data-bill")}</p>
        </div>
      `
    }
  });
  const totalEle = document.querySelectorAll("#withdrawTotal").item(0);
  billsHtml += `<p class="pt-2 mb-0">Total: ${totalEle.innerHTML}</p>`
  container.innerHTML = billsHtml;
  return container;
}

function depositPage(user){
  let container = document.createElement("div");
  container.innerHTML =
  `
    <h3 class="text-center">入金額を入力してください</h3>
    <form>
      <div class="form-group col-12 py-3 px-0">
        <input type="text" placeholder="$105.00" class="form-control deposit-input">
      </div>
    </form>
  `
  container.append(backNextButton("戻る", "次へ"));

  let depositInput = container.querySelectorAll(".deposit-input").item(0);

  container.querySelectorAll("#pageBack").item(0).addEventListener("click", function(){
    bankReturn();
    config.bankPage.append(mainBankPage(user));
  });
  container.querySelectorAll("#pageNext").item(0).addEventListener("click", function(){
    if(depositInput.value === "") alert("入金額を入力してください");
    else {
      bankReturn();
      user.depositMoney(parseInt(depositInput.value));
      config.bankPage.append(mainBankPage(user));
    }
  });

  return container;
}

function comeBackLater(user){
  let container = document.createElement("div");
  container.innerHTML =
  `
    <h3 class="text-center">何日間運用しますか(年利10%)</h3>
    <form>
      <div class="form-group col-12 py-3 px-0">
        <input type="text" placeholder="4 days" class="form-control days-input">
      </div>
    </form>
  `
  container.append(backNextButton("戻る", "確認"));

  let daysInput = container.querySelectorAll(".days-input").item(0);

  container.querySelectorAll("#pageBack").item(0).addEventListener("click", function(){
    bankReturn();
    config.bankPage.append(mainBankPage(user));
  });
  container.querySelectorAll("#pageNext").item(0).addEventListener("click", function(){
    if(daysInput.value === "") alert("運用日数を入力してください");
    else {
      bankReturn();
      user.increaseMoneyByInterest(parseInt(daysInput.value), 10);
      config.bankPage.append(mainBankPage(user));
    }
  });

  return container;
}