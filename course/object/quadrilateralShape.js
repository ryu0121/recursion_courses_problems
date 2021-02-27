class Point{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}

class Line{
  constructor(startPoint, endPoint){
    this.startPoint = startPoint;
    this.endPoint = endPoint;
  }

  getLength(){
    return Math.sqrt(Math.pow(this.endPoint.x - this.startPoint.x, 2) + Math.pow(this.endPoint.y - this.startPoint.y, 2));
  }
}

class Quadrilaterals{
  constructor(lineAB, lineBC, lineCD, lineDA){
    //辺: AB,BC,CD,DA, 対角線: AC,BD
    // 入力は4辺のみにして、対角線はQuadrilateralの状態として内部で作成、保存しています
    this.lineAB = lineAB;
    this.lineBC = lineBC;
    this.lineCD = lineCD;
    this.lineDA = lineDA;
    this.lineAC = new Line(lineAB.startPoint, lineBC.endPoint);
    this.lineBD = new Line(lineBC.startPoint, lineCD.endPoint);
    //角度: DAB(A), ABC(B), BCD(C), CDA(D)
    this.angleDAB = this.curriculateAngle(this.lineAB.getLength(), this.lineBD.getLength(), this.lineDA.getLength());
    this.angleABC = this.curriculateAngle(this.lineAB.getLength(), this.lineAC.getLength(), this.lineBC.getLength());
    this.angleBCD = this.curriculateAngle(this.lineBC.getLength(), this.lineBD.getLength(), this.lineCD.getLength());
    this.angleCDA = this.curriculateAngle(this.lineDA.getLength(), this.lineAC.getLength(), this.lineCD.getLength());
  }

  // line2の向かいにある角の大きさを求める
  curriculateAngle(line1, line2, line3){
    let value = ( Math.pow(line1, 2) + Math.pow(line3, 2) - Math.pow(line2, 2) ) / (2 * line1 * line3); //アークコサインの中身
    let angle = 180 / Math.PI * Math.acos(value); // 角度を出す(弧度法) -> 度数法に変換(180 / Math.PI)
    if(angle < 1 && value > -1 && value < 1) return angle;
    else if(value > -1 && value < 1) return Math.round(angle);
    else return 180;
  }

  getShapeType(){
    if(this.lineAB.getLength() == 0 || this.lineBC.getLength() == 0 || this.lineCD.getLength() == 0 || this.lineDA.getLength() == 0) return "not a quadrilateral."; // 頂点が2点以上重なっている場合
    else if(this.angleDAB == 180 || this.angleABC == 180 || this.angleBCD == 180 || this.angleCDA == 180) return "not a quadrilateral."; // 一つ以上の頂点が二つの頂点の直線上にある場合
    else if(this.lineAB.getLength() == this.lineBC.getLength() && this.lineBC.getLength() == this.lineCD.getLength() && this.lineCD.getLength() == this.lineDA.getLength() && this.angleABC == 90 && this.angleBCD == 90 && this.angleCDA == 90) return "正方形"; // 全ての辺・角が等しい場合
    else if(this.lineAB.getLength() == this.lineBC.getLength() && this.lineBC.getLength() == this.lineCD.getLength() && this.lineCD.getLength() == this.lineDA.getLength() && this.angleABC == this.angleCDA && this.angleDAB == this.angleBCD) return "ひし形"; //全ての辺が等しく、向かい合う角が等しい場合
    else if(this.lineAB.getLength() == this.lineCD.getLength() && this.lineBC.getLength() == this.lineDA.getLength() && this.angleABC == 90 && this.angleBCD == 90 && this.angleCDA == 90) return "長方形"; // 向かい合う辺が等しく、全ての角が90°の場合
    else if(this.lineAB.getLength() == this.lineCD.getLength() && this.lineBC.getLength() == this.lineDA.getLength() && this.angleABC == this.angleCDA && this.angleDAB == this.angleBCD) return "平行四辺形"; // 向かい合う辺・角が等しい場合
    else if(this.angleCDA == 180 - this.angleDAB || this.angleCDA == 180 - this.angleBCD) return "台形" // AB//CD or AD//BC の場合(同位角が存在する場合)
    else if(( this.lineAB.getLength() == this.lineBC.getLength() && this.lineCD.getLength() == this.lineDA.getLength() ) || ( this.lineAB.getLength() == this.lineDA.getLength() && this.lineCD.getLength() == this.lineBC.getLength() )) return "凧" // 隣合う二辺が等しい場合 
    else return "その他の四角形";
  }

  isQuadrilateral(){
    // 四角形ではない場合は全ての頂点が(0, 0)にある
    if(this.getShapeType() == "not a quadrilateral.") return false;
    else return true;
  }

  getPerimeter(){
    if(!this.isQuadrilateral()) return 0;
    return this.lineAB.getLength() + this.lineBC.getLength() + this.lineCD.getLength() + this.lineDA.getLength();
  }

  getArea(){
    if(!this.isQuadrilateral()) return 0;
    // 四角形を二つの三角形に分け、それぞれの面積を足し合わせる
    // height1 = △ABCの辺ACを底辺とした時の高さ
    // height2 = △ADCの辺ACを底辺とした時の高さ
    let value1 = ( Math.pow(this.lineAB.getLength(), 2) - Math.pow(this.lineBC.getLength(), 2) + Math.pow(this.lineAC.getLength(), 2) ) / (2 * this.lineAC.getLength());
    let height1 = Math.sqrt( Math.pow(this.lineAB.getLength(), 2) - Math.pow(value1, 2) );
    let value2 = ( Math.pow(this.lineCD.getLength(), 2) - Math.pow(this.lineDA.getLength(), 2) + Math.pow(this.lineAC.getLength(), 2) ) / (2 * this.lineAC.getLength());
    let height2 = Math.sqrt( Math.pow(this.lineCD.getLength(), 2) - Math.pow(value2, 2) );
    return this.lineAC.getLength() * (height1 + height2) / 2; //共通の底辺 * (△ABCの高さ + △ADCの高さ)
  }

  getAngle(){
    if(!this.isQuadrilateral()){
      this.angleDAB = 0;
      this.angleABC = 0;
      this.angleCDA = 0;
      this.angleBCD = 0;
    };
    console.log(this.angleDAB);
    console.log(this.angleABC);
    console.log(this.angleCDA);
    console.log(this.angleBCD);
  }

  draw(){
    let shape = this.getShapeType();
    if(shape === "長方形"){
      console.log("-----");
      console.log("|   |");
      console.log("|   |");
      console.log("-----");
    }
    else if(shape === "正方形"){
      console.log("----");
      console.log("|   |");
      console.log("|   |");
      console.log("|   |");
      console.log("|   |");
      console.log("----");
    }
    else if(shape === "ひし形"){
      console.log("　         　／ \\");
      console.log("      　　／     \\");
      console.log("　 　　　／        \\");
      console.log("   　／　　         \\");
      console.log("    \\   　       　／　");
      console.log("     \\　        ／　");
      console.log("      \\      ／　");
      console.log("       \\　 ／　");
    }
    else if(shape === "平行四辺形"){
      console.log("　       ／｜");
      console.log("　    ／   ｜");
      console.log("　 ／　　　 ｜");
      console.log("｜　　　　  ｜");
      console.log("｜　　　　／　");
      console.log("｜　　 ／　");
      console.log("｜　／　");
    }else if(shape === "台形"){
      console.log("　　　　　　﹍　﹍");
      console.log(" 　　　　／　　　　　＼　");
      console.log(" 　　／　　　　　　　　　＼");
      console.log(" 　　﹉　﹉　﹉　﹉　﹉　﹉　");
    }else if(shape === "凧"){
      console.log("　          　／  \\");
      console.log("　　     　　／     \\");
      console.log("　   　　　／        \\");
      console.log("   　　／　　         \\");
      console.log("        \\　       　／　");
      console.log("         \\　 　   ／　");
      console.log("          \\　  ／　");
    }
  }
}

// //test1 正方形１
lineAB = new Line(new Point(0,0), new Point(5,0));
lineBC = new Line(new Point(5,0), new Point(5,5));
lineCD = new Line(new Point(5,5), new Point(0,5));
lineDA = new Line(new Point(0,5), new Point(0,0));
square1 = new Quadrilaterals(lineAB,lineBC,lineCD,lineDA);
console.log(square1.getArea());
console.log(square1.getShapeType())
square1.draw();

// // //test2 正方形２
lineAB = new Line(new Point(0,4), new Point(4,8))
lineBC = new Line(new Point(4,8), new Point(8,4))
lineCD = new Line(new Point(8,4), new Point(4,0))
lineDA = new Line(new Point(4,0), new Point(0,4))
square2 = new Quadrilaterals(lineAB,lineBC,lineCD,lineDA)
console.log(square2.getShapeType())
square2.draw();

// //test2' 正方形２'
lineAB = new Line(new Point(0+5,4+5), new Point(4+5,8+5))
lineBC = new Line(new Point(4+5,8+5), new Point(8+5,4+5))
lineCD = new Line(new Point(8+5,4+5), new Point(4+5,0+5))
lineDA = new Line(new Point(4+5,0+5), new Point(0+5,4+5))
square3 = new Quadrilaterals(lineAB,lineBC,lineCD,lineDA)
console.log(square3.getShapeType())
square3.draw();

// // //test3 長方形
lineAB = new Line(new Point(0,0), new Point(8,0))
lineBC = new Line(new Point(8,0), new Point(8,5))
lineCD = new Line(new Point(8,5), new Point(0,5))
lineDA = new Line(new Point(0,5), new Point(0,0))
rectangle = new Quadrilaterals(lineAB,lineBC,lineCD,lineDA)
console.log(rectangle.getShapeType())
rectangle.draw();

// // //test4 ひし形
lineAB = new Line(new Point(4,12),new  Point(0,6))
lineBC = new Line(new Point(0,6), new Point(4,0))
lineCD = new Line(new Point(4,0), new Point(8,6))
lineDA = new Line(new Point(8,6), new Point(4,12))
rhombus = new Quadrilaterals(lineAB,lineBC,lineCD,lineDA)
console.log(rhombus.getShapeType())
rhombus.draw();

// // //test5 平行四辺形１
lineAB = new Line(new Point(0,0), new Point(2,2))
lineBC = new Line(new Point(2,2), new Point(2,6))
lineCD = new Line(new Point(2,6), new Point(0,4))
lineDA = new Line(new Point(0,4), new Point(0,0))
parallelogram1 = new Quadrilaterals(lineAB,lineBC,lineCD,lineDA)
console.log(parallelogram1.getShapeType())
parallelogram1.draw();

// // //test6 平行四辺形２
lineAB = new Line(new Point(0,0), new Point(4,0))
lineBC = new Line(new Point(4,0), new Point(6,2))
lineCD = new Line(new Point(6,2), new Point(2,2))
lineDA = new Line(new Point(2,2), new Point(0,0))
parallelogram2 = new Quadrilaterals(lineAB,lineBC,lineCD,lineDA)
console.log(parallelogram2.getShapeType())
parallelogram2.draw();

// // //test7 台形１
lineAB = new Line(new Point(0,0), new Point(6,0))
lineBC = new Line(new Point(6,0), new Point(4,2))
lineCD = new Line(new Point(4,2), new Point(2,2))
lineDA = new Line(new Point(2,2), new Point(0,0))
trapezoid1 = new Quadrilaterals(lineAB,lineBC,lineCD,lineDA)
console.log(trapezoid1.getShapeType())
trapezoid1.draw();

// // //test8 台形２
lineAB = new Line(new Point(0,0), new Point(4,0))
lineBC = new Line(new Point(4,0), new Point(6,2))
lineCD = new Line(new Point(6,2), new Point(6,6))
lineDA = new Line(new Point(6,6), new Point(0,0))
trapezoid2 = new Quadrilaterals(lineAB,lineBC,lineCD,lineDA)
console.log(trapezoid2.getShapeType())
trapezoid2.draw();

// // //test9 凧
lineCD = new Line(new Point(0,4), new Point(4,10))
lineDA = new Line(new Point(4,10),new  Point(8,4))
lineAB = new Line(new Point(8,4), new Point(4,0))
lineBC = new Line(new Point(4,0), new Point(0,4))
kite = new Quadrilaterals(lineAB,lineBC,lineCD,lineDA)
console.log(kite.getShapeType())
kite.draw();

// // //test9 not a quadrilateral
lineAB = new Line(new Point(0,0), new Point(3,0))
lineBC = new Line(new Point(3,0), new Point(6,3))
lineCD = new Line(new Point(6,3), new Point(4,0))
lineDA = new Line(new Point(4,0), new Point(0,4))
test = new Quadrilaterals(lineAB,lineBC,lineCD,lineDA)
console.log(test.getShapeType())
test.getAngle();
test.draw();