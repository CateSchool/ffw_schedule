let table;

function preload() {
  table = loadTable('schedule.csv', 'csv', 'header');
  //the file can be remote
  //table = loadTable("http://p5js.org/reference/assets/mammals.csv",
  //                  "csv", "header");
}

function setup() {
  let html_str = '';
  //cycle through the table
  for (let r = 0; r < table.getRowCount(); r++) {
    let eventTime = table.getString(r, 0);
    let title = table.getString(r, 1);
    let location = table.getString(r, 2);
    let extra = table.getString(r, 3);
    html_str += getHTMLRow(eventTime, title, location, extra);
  }
  console.log(html_str);
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