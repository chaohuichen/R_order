export const insertHtml = (orders) => {
  let tempStr = ''
  let resultString = ''

  for (const order of orders) {
    for (let item of order.data) {
      tempStr += `<tr>
      <td style="text-align:left">${item.name}</td>
      <td>${item.count}</td>
      <td>${0}</td>
      <td>${0}</td>
      </tr> `
    }
  }

  resultString += tempStr
  const htmlContent = `
  <!DOCTYPE html>
<html >
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200&family=Oswald:wght@200&display=swap" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300&family=Oswald:wght@200&display=swap" rel="stylesheet">
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
      font-size: 12px;
    }
    h1{
      font-family: 'Oswald';
      font-weight:900;
      font-size: xx-large;
    }
    #subheading{
      font-family: 'Montserrat', sans-serif;
      font-size: 14px;
      letter-spacing: 1px;
      
    }
  </style>
  <body>
    <div id="page-wrap">
      <div style="position: fixed; top:0; width: 600px">
          <div class="row" style = "margin-bottom: 20px;">

            <div class="col">
              <img src="https://fillupstore.s3.amazonaws.com/Slice+30.png" style="width: 140px; height: 240px">
            </div>

            <div class="col-2" style="margin-top: 20px">
              <h1>FillUP LOGISTIC</h1>
              <p id ='subheading'>Fillup Logistic</p>
              <p id ='subheading'>646-552-8898
                <br/>
                530 5th ave New York NY 10036
              </p>
              <h1 style="font-size: 40px; letter-spacing: 5px; font-weight: bold;">INVOICE</h1>
              
              <div>  
              <p id ='subheading' style=" font-weight: bold;">Invoice no: #ABCDEFGHIJKLMN</p>
              <p id ='subheading'style=" font-weight: bold;">Invoice due date:10-20-2021</p>
              <p id ='subheading'style=" font-weight: bold;">Date issue: 10-20-2021</p>
              </div>
              
            </div>
          </div>

          <div class="row" style = "margin-bottom: 30px;">
            <div style="text-align: left;" class="col">
              <h1 style="font-weight: 900; font-size: 30px; color: black">
                BILL TO <br />
              </h1>
              <p id="subheading">
                Sonny Liu <br />
                Fillup Store NY1
                <br />
                636-469-9628 92nd@fillup.coffee <br />
                2486 Broadway. New York, NY0025
              </p>
            </div>

            <div style="text-align: left;" class="col-2">
              <h1 style="font-weight: 900; font-size: 30px; color: black">
                SHIP TO <br />
              </h1>

              <p id="subheading">
                Sonny Liu <br />
                Fillup Store NY1
                <br />
                636-469-9628 92nd@fillup.coffee <br />
                2486 Broadway. New York, NY0025
              </p>
            </div>

          </div>
        
          <div style="height: 500px; position: fixed; top: 30; width: 680px">
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
          <p style="text-align: right">Amount due </p>

          </div>

          </div>

          <div style="bottom: 0; position: fixed; width: 680px; margin-bottom: 30px;">
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
