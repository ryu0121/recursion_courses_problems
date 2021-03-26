// アプリの概要
// 選択されたカメラモデルとアクセサリによって使用できるバッテリーを一覧表示する
// ユーザーの操作↓
// ① メーカー(ブランド)を選択
// ② カメラモデルを選択
// ③使用したいアクセサリがあるならそのアクセサリの消費電力を入力
// 表示の内容↓
// バッテリーのもつ制約(以下)にそって使用できるバッテリーを一覧表示する
// 制約: 要件に以下のように書かれていました。
// 安全に使用できる最低電圧を終止電圧と言います。終止電圧時に電池が供給できる電力は、終止電圧 × 最大放電電流 で計算でき、カメラの消費電力を上回るようにしなければなりません。
//                                                                  (endVoltage) (maxDraw)
const battery =
    [{
        "batteryName": "WKL-78",
        "capacityAh": 2.3,
        "voltage": 14.4,
        "maxDraw": 3.2,
        "endVoltage": 10,
    },
    {
        "batteryName": "WKL-140",
        "capacityAh": 4.5,
        "voltage": 14.4,
        "maxDraw": 9.2,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-78",
        "capacityAh": 2.5,
        "voltage": 14.5,
        "maxDraw": 10,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-140",
        "capacityAh": 3.6,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 5,
    },
    {
        "batteryName": "IOP-E78",
        "capacityAh": 6.6,
        "voltage": 14.4,
        "maxDraw": 10.5,
        "endVoltage": 8,
    },
    {
        "batteryName": "IOP-E140",
        "capacityAh": 9.9,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 10,
    },
    {
        "batteryName": "IOP-E188",
        "capacityAh": 13.2,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C65",
        "capacityAh": 4.9,
        "voltage": 14.8,
        "maxDraw": 4.9,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C85",
        "capacityAh": 6.3,
        "voltage": 14.4,
        "maxDraw": 6.3,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C140",
        "capacityAh": 9.8,
        "voltage": 14.8,
        "maxDraw": 10,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C290",
        "capacityAh": 19.8,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 12,
    }]
;

const camera =
    [{
        "brand": "Cakon",
        "model": "ABC 3000M",
        "powerConsumptionWh": 35.5,
    },
    {
        "brand": "Cakon",
        "model": "ABC 5000M",
        "powerConsumptionWh": 37.2,
    },
    {
        "brand": "Cakon",
        "model": "ABC 7000M",
        "powerConsumptionWh": 39.7,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9000M",
        "powerConsumptionWh": 10.9,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9900M",
        "powerConsumptionWh": 15.7,
    },
    {
        "brand": "Go MN",
        "model": "UIK 110C",
        "powerConsumptionWh": 62.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 210C",
        "powerConsumptionWh": 64.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 230C",
        "powerConsumptionWh": 26.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 250C",
        "powerConsumptionWh": 15.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 270C",
        "powerConsumptionWh": 20.3,
    },
    {
        "brand": "VANY",
        "model": "CEV 1100P",
        "powerConsumptionWh": 22,
    },
    {
        "brand": "VANY",
        "model": "CEV 1300P",
        "powerConsumptionWh": 23,
    },
    {
        "brand": "VANY",
        "model": "CEV 1500P",
        "powerConsumptionWh": 24,
    },
    {
        "brand": "VANY",
        "model": "CEV 1700P",
        "powerConsumptionWh": 25,
    },
    {
        "brand": "VANY",
        "model": "CEV 1900P",
        "powerConsumptionWh": 26,
    }]
;

// ブランドの選択ができるエレメントを作成
// brands(配列)にブランドを入れていき、すでに配列に存在するブランドは追加しないようにする(集合)
const brandSelect = document.getElementById("brand");

function setBrands(camera){
  let brands = [];
  for(let i = 0; i < camera.length; i++){
    if(!brands.includes(camera[i].brand)){
      let option = document.createElement("option");
      option.setAttribute("value", camera[i].brand);
      option.classList.add("brand");
      option.innerHTML = `${camera[i].brand}`;
      brandSelect.append(option);
      brands.push(camera[i].brand);
    }
  }
}

// モデルの選択ができるエレメントを作成
// トリガーはブランドが選択された時
const modelSelect = document.getElementById("model");

function showModels(brand){
  modelSelect.innerHTML = "";
  for(let i = 0; i < camera.length; i++){
    if(camera[i].brand == brand) {
      const option = document.createElement("option");
      option.setAttribute("value", camera[i].model);
      option.innerHTML = `${camera[i].model}`;
      modelSelect.append(option);
    }
  }
}

setBrands(camera); // ブラウザ更新時実行
brandSelect.onchange = function(){
  showModels(brandSelect.value);
};

const displayDiv = document.getElementById("display");
// 以下の消費電力をグローバルスコープに設定。
let currPowerConsumptionWh = 0;
let modelsPowerConsumptionWh = 0;
let accessarysPowerConcumptionWh = 0;

function showCanUsedBatteries(type, power){
  displayDiv.innerHTML = `<h3 class="font-weight-normal pb-2">step4: Choose Your Battery</h3>`;
  if(type === "camera") modelsPowerConsumptionWh = power;
  else if(type === "accessary") accessarysPowerConcumptionWh = power;
  currPowerConsumptionWh = modelsPowerConsumptionWh + accessarysPowerConcumptionWh;
  for(let i = 0; i < battery.length; i++){
    if(isCanUsedBattery(i)) insertEleIntoDisplay(battery[i]);;
  }
}

// 「カメラ+アクセサリの消費電力より大きい最終電力(終始電圧時の消費電力)を持つバッテリー」かどうか(boolean)
function isCanUsedBattery(i){
  return battery[i].maxDraw * battery[i].endVoltage > currPowerConsumptionWh
}

// 一覧表示にエレメントを加える
function insertEleIntoDisplay(battery){
  const hours = Math.round(battery.capacityAh * battery.voltage / currPowerConsumptionWh * 10) / 10;
  const discriptionDiv = document.createElement("div");
  discriptionDiv.classList.add("bg-white", "border", "border-secondary", "d-flex", "justify-content-between", "align-items-center", "px-4", "py-2");
  discriptionDiv.innerHTML = `
    <p class="battery-name mb-0">${battery.batteryName}</p>
    <p class="mb-0">Estimated ${hours} hours on selected setup</p>
  `;
  displayDiv.append(discriptionDiv);
}

modelSelect.addEventListener("change", function(){
  showCanUsedBatteries("camera" ,selectedModelsPowerConsumptionWh(modelSelect.value));
});

// 選ばれたカメラモデルの消費電力を返す
function selectedModelsPowerConsumptionWh(model){
  for(let i = 0; i < camera.length; i++){
    if(camera[i].model === model) return camera[i].powerConsumptionWh;
  }
}

const accessary = document.getElementById("accessary");
accessary.addEventListener("change", function(){
  const powerConsumptionWh = accessary.value === "" ? 0 : parseInt(accessary.value); // 入力がない場合は消費電力は0とする
  showCanUsedBatteries("accessary", powerConsumptionWh);
});