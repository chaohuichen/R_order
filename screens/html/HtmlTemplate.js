export const insertHtml = (itemStr, shipTo, billTo, dateIssue, invoiceNo) => {
  var invoiceStr = `<div class="col-2" style="margin-top: 20px">
  <!-- company info -->
  <h1>FillUP LOGISTIC</h1>
  <p id="subheading">Fillup Logistic</p>
  <p id="subheading">
    646-552-8898
    <br />
    530 5th ave New York NY 10036
  </p>
  <p style="font-size: 40px; letter-spacing: 5px; font-weight: bold; font-family: 'Arial Black'">
    INVOICE
  </p>
  <!-- invoice title -->
  <div>
    <p id="subheading" style="font-weight: bold">
      Invoice no: ${invoiceNo}
    </p>
    <p id="subheading" style="font-weight: bold">
      Invoice due date:10-20-2021
    </p>
    <p id="subheading" style="font-weight: bold">
      Date issue: ${dateIssue}
    </p>
  </div>
</div>`

  var billStr = `<div style="text-align: left" class="col">
  <h1 style="font-weight: 900; font-size: 30px; color: black">
    BILL TO <br />
  </h1>
  <p id="subheading">
    Sonny Liu <br />
    ${billTo}
    <br />
    636-469-9628 92nd@fillup.coffee <br />
    2486 Broadway. New York, NY0025
  </p>
</div>`

  var shipStr = ` <div style="text-align: left" class="col-2">
  <h1 style="font-weight: 900; font-size: 30px; color: black">
    SHIP TO <br />
  </h1>

  <p id="subheading">
    Sonny Liu <br />
    ${shipTo}
    <br />
    636-469-9628 92nd@fillup.coffee <br />
    2486 Broadway. New York, NY0025
  </p>
</div>`

  var paymentStr = ` <div style="width: 540px">
  <div
    class="row"
    style="letter-spacing: 1px; border-bottom: 3px solid black"
  >
    <div class="col" style="width: 70%">
      <div style="text-align: left; float: left">
        <h1 style="text-align: center">PAYMENT METHOD:</h1>
        <h4 style="text-align: center">PAYMENT TO:${billTo}</h4>
        <h4>ACCT NO: 8888 8888 8888 8888 (Bank)</h4>
        <h4>ADDRESS: 540 5th Avenue, 9FL, NEW YORK, NY 10046</h4>
      </div>
    </div>

    <div class="col" style="width: 30%">
      <h1 style="text-align: right; float: right">THANK <br />YOU!</h1>
    </div>
  </div>
  <h5 style="text-align: center">WWW.FILLUP.COFFEE</h5>
</div>`

  // for (let order of orders) {
  //   for (let item of order.data) {
  //     tempStr += `<tr>
  //     <td style="text-align:left">${item.name}</td>
  //     <td>${item.count}</td>
  //     <td>${0}</td>
  //     <td>${0}</td>
  //     </tr> `
  //   }
  // }
  // var resultString = tempStr

  var pageWrapStr = `<div id="page-wrap">
<div style="width: 540px">
  <div class="row" style="margin-bottom: 20px">
    <div class="col">
      <div>
        <img
          src="https://fillupstore.s3.amazonaws.com/Slice+30.png"
          style="width: 100px; height: 150px"
        />
      </div>
    </div>
    ${invoiceStr}
  </div>

  <div class="row" style="margin-bottom: 30px">
  ${billStr}

   ${shipStr}
  </div>
  <table cellspacing="0" cellpadding="0" style="width: 540px;">
    <tr class="title-tr">
      <th>Item</th>
      <th>QTY</th>
      <th>Price</th>
      <th>Total</th>
    </tr>
    ${itemStr}
  </table>
  <div style = "margin-bottom: 60px">
  <p style="text-align:
   right; padding-right: 60px">Amount due</p>
   </div>
</div>

${paymentStr}
</div>`
  itemStr = ''
  return pageWrapStr
}
