class Item{
  constructor(name, price, img){
    this.name = name;
    this.price = price;
    this.img = img;
  }
}

const sliderItemImgs = document.querySelectorAll(".slider-data .slider-item");
const sliderItemNames = ["protein1", "protein2", "protein3", "protein4", "protein5", "protein6", "protein7", "protein8", "protein9"];
const sliderItemPrices = ["100", "90", "80", "110", "85", "75", "77", "88", "95"];

//自動販売機の商品を9つ作っています
let itemList = [];

for(let i = 0; i < sliderItemImgs.length; i++){
  itemList.push(new Item(sliderItemNames[i], sliderItemPrices[i], sliderItemImgs.item(i)));
}

// sliderShow > main & extra というDOM構造です
// main には新しく出現するimgDiv(ユーザーがボタンを押した商品)を格納
// extra には消えていく画像(ボタンを押す前に表示されていた商品)を格納
let sliderShow = document.getElementById("slider-show");
let main = document.createElement("div");
let extra = document.createElement("div");
main.classList.add("main", "full-width", "d-flex", "justify-content-center", "align-items-center");
extra.classList.add("extra", "full-width", "d-flex", "justify-content-center", "align-items-center");

//最初の商品を表示
main.append(itemList[0].img);
sliderShow.append(main);
sliderShow.append(extra);

//itemList のインデックスと対応しています
main.setAttribute("data-index", "0");

//商品番号、名前、値段を表示するelementです
let displayNumberDiv = document.getElementById("number");
let displayNamePriceDiv = document.getElementById("name-price");

//イベントハンドラのステートメント。画像以外の商品の情報を表示します。
function displayItem(index){
  displayNumberDiv.innerHTML = ``;
  displayNamePriceDiv.innerHTML = ``;
  displayNumberDiv.innerHTML = `<h2>${index + 1}</h2>`;
  displayNamePriceDiv.innerHTML = `<h2>${itemList[index].name}</h2><h2>$${itemList[index].price}</h2>`
}

// 1~9のボタンelementを配列に格納しています
const buttons = document.querySelectorAll(".nine-buttons");

//イベントハンドラのステートメント。画像を表示します。
//if文を使って「選ばれた商品にいくには右回りと左周りのどちらが近いか」で分岐させています。
function slideSteps(chosenNumber){
  const currItemNumber = parseInt(main.getAttribute("data-index")) + 1;
  if(chosenNumber > currItemNumber){
    (chosenNumber - currItemNumber <= Math.floor(buttons.length/2))
    ? slideStepsHelper(1, chosenNumber - currItemNumber) : slideStepsHelper(-1, buttons.length - chosenNumber + currItemNumber);
  }else if(chosenNumber < currItemNumber){
    (currItemNumber - chosenNumber <= Math.floor(buttons.length/2))
    ? slideStepsHelper(-1, currItemNumber - chosenNumber) : slideStepsHelper(1, buttons.length - currItemNumber + chosenNumber);
  }
}

//slideSteps関数のヘルパー関数です。
//インデックスを右or左に1移動させます。
//現在の画像と移動後の画像と回転の向きをanimationMain関数に渡してanimationはそちらに委譲します。
//countは現在の商品番号と移動先の商品番号の距離です
//こちらが1になるまで商品の移動を続けます。
function slideStepsHelper(step, count){
  let index = parseInt(main.getAttribute("data-index"));
  const currElement = itemList[index].img;
  index += step;
  if(index <= -1) index = buttons.length - 1;
  else if(index >= 9) index = 0;
  main.setAttribute("data-index", index.toString());
  const nextElement = itemList[index].img;
  if(step === 1) {
    animationMain(currElement, nextElement, "right");
  }
  else if(step === -1) animationMain(currElement, nextElement, "left");
  
  if(count > 1) setTimeout(slideStepsHelper, 1000, step, count-1);
}

//アニメーションを担当
function animationMain(currElement, nextElement, animationType){
  main.innerHTML = "";
  main.append(nextElement);

  extra.innerHTML = "";
  extra.append(currElement);

  main.classList.add("expand-animation");
  extra.classList.add("deplete-animation");

  if(animationType === "right"){
    sliderShow.innerHTML = "";
    sliderShow.append(main);
    sliderShow.append(extra);
  }else if(animationType === "left"){
    sliderShow.innerHTML = "";
    sliderShow.append(extra);
    sliderShow.append(main);
  }
}

//for文を使って9つのボタン全てにイベントリスナーを当てています。
for(let i = 0; i < itemList.length; i++){
  buttons[i].addEventListener("click", function(){
    displayItem(i);
    slideSteps(i+1);
  })
}

//PUSHボタンを押したらalertで購入をお知らせします。
document.getElementById("order-button").addEventListener("click", function(){
  alert("You've got " + itemList[main.getAttribute("data-index")].name);
})