let resultString = ''

{
  /*
<tr>
<td style="text-align:left">Centro comercial Moctezuma</td>
<td>Francisco Chang</td>
<td>Mexico</td>
<td>UK</td>
</tr> 

*/
}

export const insertHtml = (orders) => {
  let tempStr = ''
  for (const order of orders) {
    for (let item of order.data) {
      tempStr += `<tr>
      <td style="text-align:left">${item.name}</td>
      <td>${item.count}</td>
      <td>${0}</td>
      <td>${0}</td>
      </tr> `
    }
    // console.log('tempstry ', tempStr)
  }
  resultString += tempStr
  const htmlContent = `
  <!DOCTYPE html>
<html >
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  </head>
  <style>
    * {
      margin: 0;
      padding: 0;
    }
    body {
      font: 14px/1.4 Georgia, serif;
    }
    #page-wrap {
      width: 680px;
      height: 842px;
      margin: 0 auto;
    }
    table {
      border-collapse: collapse;
    }
    td {
      padding: 15px;
      font-size: 12px;
    }
    tr:nth-child(even) {
      background-color: #dddddd;
    }

    .title-tr {
      background-color: black;
      color: white;
    }

    .row:after {
      content: "";
      display: table;
      clear: both;
    }
    .col{
      float: left;
      width: 50%;
    }
    .col-2{
      float: left;
      width: 50%;
    }
    td{
      text-align: center;
    }
  </style>
  <body>
    <div id="page-wrap">
          <div class="row" style = "margin-bottom: 20px;">

            <div class="col">
              <img src="./logo.png" style="width: 140px; height: 240px">
            </div>

            <div class="col-2" style="margin-top: 20px">
              <h1>FillUP LOGISTIC</h1>
              <p>Fillup Logistic</p>
              <p>646-552-8898
                <br/>
                530 5th ave New York NY 10036
              </p>
              <h1 style="font-size: 40px; letter-spacing: 5px; font-weight: bold;">INVOICE</h1>
              
              <div>  
              <p style=" font-weight: bold;">Invoice no: #ABCDEFGHIJKLMN</p>
              <p style=" font-weight: bold;">Invoice due date:10-20-2021</p>
              <p style=" font-weight: bold;">Date issue: 10-20-2021</p>
              </div>
              
            </div>
          </div>

          <div class="row" style = "margin-bottom: 30px;">
            <div style="text-align: left;" class="col">
              <p style="font-weight: 900; font-size: 30px; color: black">
                Bill To <br />
              </p>
              <p>
                Sonny Liu <br />
                Fillup Store NY1
                <br />
                636-469-9628 92nd@fillup.coffee <br />
                2486 Broadway. New York, NY0025
              </p>
            </div>

            <div style="text-align: left;" class="col-2">
              <p style="font-weight: 900; font-size: 30px; color: black">
                Ship To <br />
              </p>

              <p>
                Sonny Liu <br />
                Fillup Store NY1
                <br />
                636-469-9628 92nd@fillup.coffee <br />
                2486 Broadway. New York, NY0025
              </p>
            </div>

          </div>
          <div>
          <table
            cellspacing="0"
            cellpadding="0"
            style="width: 100%;"
          >
            <tr class="title-tr">
              <th>Item</th>
              <th>QTY</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
            ${resultString}
          </table>
          </div>
          <p style="text-align: right">Amount due </p>

          <div style="bottom: 0; position: absolute; width: 680px; margin-bottom: 30px;">
          <div class="row" style="letter-spacing: 1px; border-bottom: 3px solid black; margin-top: 40px; ">
            <div class="col" style=" width: 60%;">

              <div style="text-align: left; float:left; ">
              <h1 style="text-align: center;" >PAYMENT METHOD:</h1>
              <h4 style="text-align: center;">PAYMENT TO:</h4>
              <h4>ACCT NO: 8888 8888 8888 8888 (Bank)</h4>
              <h4>ADDRESS: 540 5th Avenue, 9FL, NEW YORK, NY 10046</h4>
              </div>

              </div>
             
              <div class="col" style=" width: 30%;"><h1 style="text-align: right; float: right;">
                THANK <br>YOU!</h1>
              </div>

            </div>
            <h5 style="text-align: center;">WWW.FILLUP.COFFEE</h5>

          </div>    
    </div>
  </body>
</html>




`
  return htmlContent
}
