import { insertHtml } from '../html/HtmlTemplate'

export const insertMultiPageHtml = (
  orders,
  selectedFromValue,
  selectedToValue
) => {
  let htmlArr = []
  let tempStr = []
  let itemStr = []
  let pageWrapStr = ''
  let tempJ = ''
  let tempStrlen = 0
  let marginStr = ''
  //get all order in orders and push to tempstry array
  for (let order of orders) {
    for (let item of order.data) {
      tempStr.push(`<tr>
            <td style="text-align:left">${item.name}</td>
            <td>${item.count}</td>
            <td>${0}</td>
            <td>${0}</td>
            </tr> `)
    }
  }
  let counter = 0
  let marginStrArr = []
  //check if tempstry arr is greater then 4, to insert 4 item per page
  if (tempStr.length > 4) {
    for (let j = 0; j <= tempStr.length; j++) {
      if (counter < 4) {
        counter++
        tempJ += tempStr[j]
      }
      if (counter === 4) {
        itemStr.push(tempJ)
        counter = 0
        tempJ = ' '
      }
    }
    itemStr.push(tempJ)
    for (let i = 0; i < itemStr.length; i++) {
      tempStrlen = tempStr.length
      switch (tempStrlen) {
        case 1:
          marginStrArr.push('margin-bottom: 220px;')
          break
        case 2:
          marginStrArr.push('margin-bottom: 180px;')
          break
        case 3:
          marginStrArr.push('margin-bottom: 140px;')
          break
        case 4:
          marginStrArr.push('margin-bottom: 40px;')
          break
        default:
          break
      }
    }
    //loop itemstr.length time for how many page loop twice two page
    for (let i = 0; i < itemStr.length; i++) {
      pageWrapStr += insertHtml(
        itemStr[i],
        marginStrArr[i],
        selectedFromValue,
        selectedToValue,
        '11-01-2021',
        '#1234567890'
      )
      htmlArr.push(pageWrapStr)
      pageWrapStr = ' '
      // marginStr = ' '
    }
  } else if (tempStr.length <= 4) {
    //check how many items and margin each case 1 items to 4 items.
    tempStrlen = tempStr.length
    switch (tempStrlen) {
      case 1:
        marginStrArr.push('margin-bottom: 220px;')
        break
      case 2:
        marginStrArr.push('margin-bottom: 180px;')
        break
      case 3:
        marginStrArr.push('margin-bottom: 140px;')
        break
      case 4:
        marginStrArr.push('margin-bottom: 40px;')
        break
      default:
        break
    }
    const itemsStr = tempStr.join(' ')

    pageWrapStr += insertHtml(
      itemsStr,
      marginStr[0],
      selectedFromValue,
      selectedToValue,
      '11-01-2021',
      '#1234567890'
    )
    htmlArr.push(pageWrapStr)
    pageWrapStr = ' '
    marginStr = ' '
  }

  const htmlStr = htmlArr.join(' ')
  const htmlContent = `
        <!DOCTYPE html>
          <html>
            <head>
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
              <link
                href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200&family=Oswald:wght@200&display=swap"
                rel="stylesheet"
              />
              <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300&family=Oswald:wght@200&display=swap"
            rel="stylesheet"
          />
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
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  height: 800px;
                  width: 540px;
                  margin: 0 auto;
                  
                }
                table {
                  border-collapse: collapse;
                }
                td {
                  padding: 15px;
                  font-size: 12px;
                }
                th {
                  padding-bottom: 5px;
                  padding-top: 5px;
                }
                tr:nth-child(even) {
                  background-color: #dddddd;
                }
            
                .title-tr {
                  background-color: black;
                  color: white;
                }
                .row:after {
                  content: '';
                  display: table;
                  clear: both;
                }
                .col {
                  float: left;
                  width: 50%;
                }
                .col-2 {
                  float: right;
                  width: 50%;
                }
                td {
                  text-align: center;
                  font-size: 12px;
                }
                h1 {
                  font-family: 'Oswald';
                  font-weight: 900;
                  font-size: xx-large;
                }
                #subheading {
                  font-family: 'Montserrat', sans-serif;
                  font-size: 12px;
                }
              </style>
              <body>
                ${htmlStr}
              </body>
            </html>
        `
  return htmlContent
}
