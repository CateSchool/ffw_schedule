let meta, thurs, fri, sat, sun;

function preload() {
  meta = loadTable(getCSV("meta"), 'csv', 'header');
  thurs = loadTable(getCSV("thurs"), 'csv', 'header');
  fri = loadTable(getCSV("fri"), 'csv', 'header');
  sat = loadTable(getCSV("sat"), 'csv', 'header');
  sun = loadTable(getCSV("sun"), 'csv', 'header');
}

function setup() {
  console.log(getPage());
}

function getSeason() {
  return meta.findRow('season', 'item').getString("content");
}

function getDate(day) {
  if (day == "thurs")
    return "THURSDAY, " + meta.findRow('thurs_date', 'item').getString("content").toUpperCase();
  
    else if (day == "fri")
    return "FRIDAY, " + meta.findRow('fri_date', 'item').getString("content").toUpperCase();

  else if (day == "sat")
    return "SATURDAY, " + meta.findRow('sat_date', 'item').getString("content").toUpperCase();

  else if (day == "sun")
    return "SUNDAY, " +  meta.findRow('sun_date', 'item').getString("content").toUpperCase();
  
    return "";
}

function getPage() {
  return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Cate School ${getSeason()} Family Weekend</title>
        <!-- Favicon-->
        <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
        <!-- Core theme CSS (includes Bootstrap)-->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
            integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
            crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link href="css/styles.css" rel="stylesheet" />
        <link href="css/myStyle.css" rel="stylesheet" />
    </head>
    
    <body>
        <!-- Responsive navbar-->
        <nav class="navbar navbar-expand-lg navbar-dark cateBlue">
            <div class="container">
                <a class="navbar-brand" href="https://cateschool.org/"><img src="assets/cate_logo_sm.png" /></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item"><a class="nav-link"
                                href="https://www.cate.org/wp-content/uploads/2021/08/FINAL-Cate-Map-with-Key-2021-1.pdf">Map</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <!-- Page content-->
        <section id="introSection">
            <div class="container">
                <div class="text-center mt-5">
                    <h3>Welcome to Cate School</h3>
                    <h1>${getSeason()} Family Weekend!</h1>
                    <p class="lead">Schedule</p>
                    <div class="accordion" id="accordionExample">
                       ${getAccordionItem("thurs", thurs, 0)}
                       ${getAccordionItem("fri", fri, 1)}
                       ${getAccordionItem("sat", sat, 2)}
                       ${getAccordionItem("sun", sun, 3)}
                    </div>
                </div>
            </div>
        </section>
        <section id="modSection" class="bg-light">
            <div class="container">
    
                <h2>NOTE TO FAMILIES:</h2>
                <h2>MOD <a href="tel:805-698-4808">805-698-4808</a></h2>
                <ul>
                    <li>All boarding students must be signed into campus by 10:00 p.m. unless signed out in our special
                        Family Weekend system to stay with their parents for Saturday and/or Sunday night. </li>
                    <li>No day student overnight permission is allowed on campus. </li>
                    <li>Students must have parent permission to check out with other families. </li>
                    <li>All boarding students must be signed back on campus by 6:45 p.m. on Monday, April 24.</li>
    
    
                </ul>
                <div class="text-center">
                    <h4></h4>
                </div>
            </div>
        </section>
        <section id="eweSection" class="cateBlue">
            <div class="container">
                <div class="text-center">
                    <h1>Blue Ewe Store Hours</h1>
                    <p>Friday – 8 a.m. – 5 p.m.</p>
                    <p>Saturday – 9:00 a.m. – 2:00 p.m.</p>
                    <p>Sunday – 11:00 a.m. – 2:00 p.m</p>
                    </p>
                </div>
            </div>
        </section>
        <!-- Bootstrap core JS-->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
        <!-- Core theme JS-->
        <script src="js/scripts.js"></script>
    </body>
    
    </html>`
}


function getAccordionItem(d, table, index) {
  let day = getDate(d);

  return `
    <div class="accordion-item">
        <h2 class="accordion-header" id="heading${index}">
            <button class="accordion-button${index==0?"":" collapsed"} type="button" data-bs-toggle="collapse"
                data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                ${day}
            </button>
        </h2>
        <div id="collapse${index}" class="accordion-collapse collapse${index == 0 ? " show" : ""}" aria-labelledby="heading${index}"
            data-bs-parent="#accordionExample">
            <div class="accordion-body">
                ${getAccordionRows(table)}
            </div>
        </div>
    </div>`
}


function getAccordionRows(table) {
  let html_str = '';
  //cycle through the table
  for (let r = 0; r < table.getRowCount(); r++) {
    let eventTime = table.getString(r, 0);
    let title = table.getString(r, 1);
    let location = table.getString(r, 2);
    let extra = table.getString(r, 3);
    html_str += getHTMLRow(eventTime, title, location, extra);
  }
  // console.log(html_str);
  return html_str;
}


function getHTMLRow(eventTime, title, location, extra) {
  if (extra) {
    return getHTMLRowExtra(eventTime, title, location, extra);
  }
  let str =
    `<div class="row">
      <div class="col-5 col-sm-5">${eventTime}</div>
      <div class="col-7 col-sm-7">
        <div>${title}</div>
        <div class="location">${location}</div>
      </div>
    </div>`;

  return str;
}

function getHTMLRowExtra(eventTime, title, location, extra) {
  let str = `<div class="row">
      <div class="col-5 col-sm-5">${eventTime}</div>
      <div class="col-7 col-sm-7">
        <div>${title}</div>
        <div class="extraInfo">${extra}</div>
        <div class="location">${location}</div>
      </div>
    </div>`;

  return str;
}



function getCSV(day) {
  let id = "376417274"
  if (day == "thurs") {
    id = "2031228836"
  }
  else if (day == "fri") {
    id = "0"
  }
  else if (day == "sat") {
    id = "179506552"
  }
  else if (day == "sun") {
    id= "448196084"
  }
  let url = `https://docs.google.com/spreadsheets/d/e/2PACX-1vRpuDEbJOUv8GgvlkpIzDk4VdGJ-9gk2U8KuQutGPF0KtG1tauT0YWDpIuq0heB86otu3ohxXGfRZ-M/pub?gid=${id}&single=true&output=csv`
  return url;
}

function getJdeboiCSV(day) {
  let id = '0';
  if (day == "thurs") {
    id = "1913164791"
  }
  else if (day == "fri") {
    id = "197486102"
  }
  else if (day == "sat") {
    id = "127230405";
  }
  else if (day == "sun") {
    id = "187324293";
  }
  let url = `https://docs.google.com/spreadsheets/d/e/2PACX-1vSPzlReMFESZDW48SyJXThGoHF3vlPIwNPO7SHaDvFxuR30ZJZMLNKF8K9QDj3VhMMp4sXtN5XQ3D6H/pub?gid=${id}&single=true&output=csv`
  return url;
}