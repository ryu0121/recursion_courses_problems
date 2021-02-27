//あなたのチームは、開発したソフトウェアのすべての Q&A チェックに合格し、リリースの準備が整いました。支払いシステムを追加したので、顧客の請求書の発行システムを開発する必要があります。
//以下の構造に沿った請求書（Invoice）の設計図を作成してください。

class Invoice{
  static tax = 0.1;

  constructor(invoiceNumber, invoiceDate, company, companyAddress, billToName, billToAddress){
    this.invoiceNumber = invoiceNumber;
    this.invoiceDate = invoiceDate;
    this.company = company;
    this.companyAddress = companyAddress;
    this.billToName = billToName;
    this.billToAddress = billToAddress;
    this.invoiceItemHeadNode = null;
  }

  amountDue(taxes){
    let item = this.invoiceItemHeadNode;
    let subTotal = 0;
    while(item){
      subTotal += item.getTotalPrice();
      item = item.next;
    }
    return (taxes) ? subTotal * (1 + Invoice.tax) : subTotal;
  }

  printBuyingItems(){
    let item = this.invoiceItemHeadNode;
    while(item){
      console.log("「" + "item :" + item.product.title + ", price :" + item.product.price + ", quantity :" + item.quantity + "」");
      item = item.next;
    }
  }

  printInvoice(){
    console.log("Invoice\nNo. : " + this.invoiceNumber + "\nINVOICE DATE : " + this.invoiceDate + "\nSHIP TO : " + this.company + "\nADDRESS : " + this.companyAddress
    + "\nBILL TO : " + this.billToName + "\nADDRESS : " + this.billToAddress);
    let item = this.invoiceItemHeadNode;
    let subTotal = 0;
    while(item){
      console.log(item.product.title + "($" + item.product.price + ")--- " + item.quantity + " pcs. --- AMOOUNT: " + item.getTotalPrice());
      subTotal += item.getTotalPrice();
      item = item.next;
    }
    console.log("SUBTOTAL : " + subTotal + "\nTAX : " + subTotal * Invoice.tax + "\nTOTAL : " + this.amountDue(true));
  }
}

class InvoiceItemNode{
  constructor(quantity, product){
    this.quantity = quantity;
    this.product = product;
    this.next = null;
  }

  getTotalPrice(){
    return this.quantity * this.product.price;
  }
}

class Product{
  constructor(title, price){
    this.title = title;
    this.price = price;
  }
}

let invoice = new Invoice("UC1234567890", "2020/05/06", "Recursion", "Los Angeles", "Steven", "Dallas");

let shampoo = new Product("shampoo", 10);
let conditioner = new Product("conditioner", 5);
let toothBrush = new Product("tooth brush", 3);

let item1 = new InvoiceItemNode(7, shampoo);
invoice.invoiceItemHeadNode = item1;
let item2 = new InvoiceItemNode(9, conditioner);
item1.next = item2;
let item3 = new InvoiceItemNode(10, toothBrush);
item2.next = item3;

invoice.printBuyingItems();
invoice.printInvoice();

invoice.amountDue(false);
invoice.amountDue(true);