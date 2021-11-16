export const insertHtml = (
  itemStr,
  marginStr,
  selectedValue,
  selectedFrom,
  dateIssue,
  invoiceNo
) => {
  let invoiceStr = `<div class="col-2" style="margin-top: 20px">
  <!-- company info -->
  <h1>${selectedFrom}</h1>
  <p id="subheading">${selectedFrom}</p>
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

  let billStr = `<div style="text-align: left" class="col">
  <h1 style="font-weight: 900; font-size: 30px; color: black">
    BILL TO <br />
  </h1>
  <p id="subheading">
    Sonny Liu <br />
    ${selectedValue}
    <br />
    636-469-9628 92nd@fillup.coffee <br />
    2486 Broadway. New York, NY0025
  </p>
</div>`

  let shipStr = ` <div style="text-align: left" class="col-2">
  <h1 style="font-weight: 900; font-size: 30px; color: black">
    SHIP TO <br />
  </h1>

  <p id="subheading">
    Sonny Liu <br />
    ${selectedValue}
    <br />
    636-469-9628 92nd@fillup.coffee <br />
    2486 Broadway. New York, NY0025
  </p>
</div>`

  let paymentStr = ` <div style="width: 540px">
  <div
    class="row"
    style="letter-spacing: 1px; border-bottom: 3px solid black"
  >
    <div class="col" style="width: 78%">
      <div style="text-align: left; float: left">
        <h1 style="text-align: center">PAYMENT METHOD:</h1>
        <h4 style="text-align: center">PAYMENT TO:${selectedFrom}</h4>
        <h4>ACCT NO: 8888 8888 8888 8888 (Bank)</h4>
        <h4>ADDRESS: 540 5th Avenue, 9FL, NEW YORK, NY 10046</h4>
      </div>
    </div>

    <div class="col" style="width: 10%">
      <h1 style="text-align: right; float: right">THANK <br />YOU!</h1>
    </div>
  </div>
  <h5 style="text-align: center">WWW.FILLUP.COFFEE</h5>
</div>`

  let pageWrapStr = `<div id="page-wrap">
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
  <p style="text-align:
   right; padding-right: 60px; ${marginStr}">Amount due</p>
  
</div>
${paymentStr}

</div>`
  itemStr = ''
  return pageWrapStr
}
