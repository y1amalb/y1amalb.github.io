const colorNames = ["white", "black", "darkGrey", "greydient", "bday-bg", "lime", "bright", "yellow"];
const brightColors = ["#fff", "#000", "rgb(50, 50, 50)", "#232323", "#bcd9ea", "#0c6f00", "rgb(230, 230, 230)", "#412b00"];
const darkColors = ["#000", "#fff", "rgb(200, 200, 200)", "#ededed", "#5ba4cf", "#79ff5d", "rgb(50, 50, 50)", "#ffed00"];

const tests = {
  "English": ["6.1.21", "7.1.21"],
  "Math": ["1.1.21"]
};

const bdays = [
  {name: "Elad Hilel", date: "03.02"},
  {name: "Nikol Lokianetz", date: "03.02"},
  {name: "Itay Ozer", date: "05.02"},
  {name: "Eden Kiknadza", date: "07.02"},
  {name: "Andrea Nahom", date: "16.02"},
  {name: "Maxim Lichatzov", date: "15.02"},
  {name: "Anastasya Dobgay", date: "01.03"},
  {name: "Alona Levin", date: "31.3"},
  {name: "Jorden Hakim", date: "04.04"},
  {name: "Shira Nabay", date: "07.04"},
  {name: "Linoy Riech", date: "13.04"},
  {name: "Noa Cohen", date: "03.06"},
  {name: "Omer Levi", date: "08.06"},
  {name: "Jasmin Yakovovich", date: "12.06"},
  {name: "Ido Mazor", date: "04.07"},
  {name: "Roni Nudelman", date: "12.07"},
  {name: "Hili Shahamon", date: "09.08"},
  {name: "Linoy Levi", date: "10.08"},
  {name: "Liron Vinter", date: "12.08"},
  {name: "Gal Heler", date: "16.08"},
  {name: "Jonatan Kliminski", date: "05.09"},
  {name: "Negev Bosmat", date: "07.09"},
  {name: "Orian Papanov", date: "19.09"},
  {name: "Mishel Minin", date: "20.09"},
  {name: "Shaked Kitri", date: "03.10"},
  {name: "Assaf Nisnevich", date: "04.10"},
  {name: "Sean Panigel", date: "13.10"},
  {name: "Lior Yadumi", date: "19.10"},
  {name: "Noam Zarbiv", date: "09.12"},
  {name: "Elina Katsevman", date: "14.12"},
  {name: "Lior Galgor", date: "18.12"},
  {name: "Shaked Zilberman", date: "20.12"},
  {name: "Shira Shomer", date: "28.12"}
];

const ringingHours = [
  ["7:45", "8:25"],
  ["8:25", "9:15"],
  ["9:15", "10:00"],
  ["10:15", "11:00"],
  ["11:00", "11:50"],
  ["12:05", "12:50"],
  ["12:50", "13:35"],
  ["13:45", "14:30"],
  ["14:30", "15:15"],
  ["15:20", "16:05"],
  ["16:05", "16:50"]
];

function refresh(num) {
  let body = document.getElementsByClassName("body")[0];
  if (num < 0 || num >= body.childElementCount) {
    alert("Invalid Page ID.");
    return;
  }
  for (let i = 0; i < body.childElementCount; i++) {
    body.children[i].style.display = "none";
  }
  body.children[num].style.display = "block";
}

var state = 1;
var root = document.documentElement;

function toggle(button) {
  button.innerHTML = "Toggle Mode (" + (state ? "Dark" : "Bright") + ")";
  for (let i = 0; i < colorNames.length; i++) {
    root.style.setProperty('--' + colorNames[i], state ? brightColors[i] : darkColors[i]);
  }
  state++;
  state %= 2;
}

function formatNumber(i) {
  return i < 10 ? ("0" + i) : i;
}

var dateFormat = "DD/MM/YYYY<br>hh:mm:ss";

function startTime() {
  var today = new Date();
  var day = formatNumber(today.getDate());
  var month = formatNumber(today.getMonth() + 1);
  var year = formatNumber(today.getFullYear());
  var hour = formatNumber(today.getHours());
  var minute = formatNumber(today.getMinutes());
  var second = formatNumber(today.getSeconds());
  document.getElementById("time").innerHTML =
  dateFormat
  .replace("DD", day)
  .replace("MM", month)
  .replace("YYYY", year)
  .replace("hh", hour)
  .replace("mm", minute)
  .replace("ss", second);
  t = setTimeout(function() {
    startTime()
  }, 500);
}

function getTests(tomonth) {
  let soonTests = [];
  for (var i = 0; i < Object.keys(tests).length; i++) {
    let subject = Object.keys(tests)[i];
    console.log("Subject: "+subject);
    for (var j = 0; j < Object.values(tests[subject]).length; j++) {
      let date = Object.values(tests[subject])[j];
      console.log("Date: "+date);
      let month = date.split(".")[1];
      if (tomonth == month) {
        soonTests.push({subject: subject, day: date.split(".")[0]});
      }
    }
  }
  return soonTests;
}

var generated = false;

function displayTests() {
  if (!generated) {
    var to = document.getElementById('tests');
    var now = new Date();
    var upcoming = getTests(now.getMonth() + 1);
    var daysBeforeFirst = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
    document.querySelector(".days").innerHTML = multString("<li>-</li>", daysBeforeFirst) + document.querySelector(".days").innerHTML;
    document.getElementById(now.getDate()).style.color = "black";
    document.getElementById(now.getDate()).style.fontWeight = "bold";
    for (let i = 0; i < upcoming.length; i++) {
      console.log(i+": "+JSON.stringify(upcoming[i]));
      document.getElementById(upcoming[i].day).innerHTML = upcoming[i].day + " " + upcoming[i].subject;
    }
    generated = true;
  }
}

function multString(str, fact) {
  let o = "";
  for (let i = 0; i < fact; i++) {
    o += str;
  }
  return o;
}

function findBdays() {
  let currentMonth = new Date().getMonth() + 1;
  let currentDay = new Date().getDate();
  for (var i = 0; i < bdays.length; i++) {
    const {name, date} = bdays[i];
    let month = parseInt(date.split(".")[1]);
    let day = parseInt(date.split(".")[0]);
    if (currentMonth == month) {
      document.getElementById('bday-list').innerHTML += `<li>${name} - ${date}</li>`;
      if (currentDay == day) {
        window.alert(`Happy Birthday ${name}!!!`);
      }
    }
  }
  if (document.getElementById('bday-list').innerHTML == "") {
    document.getElementById('bday-list').innerHTML += "<p> No Birthdays this month :( <br><a onclick='allBdays();'>Show all</a></p>";
  }
}

function allBdays() {
  document.getElementById('bday-list').innerHTML = "";
  for (var i = 0; i < bdays.length; i++) {
    const {name, date} = bdays[i];
    document.getElementById('bday-list').innerHTML += `<li>${name} - ${date}</li>`;
    if (i > 10) {
      document.getElementById('bday-list').innerHTML += `<li>And more...</li>`;
      break;
    }
  }
  if (document.getElementById('bday-list').innerHTML == "") {
    document.getElementById('bday-list').innerHTML += "<p> No Birthdays exist :( </p>";
  }
}

function schedule() {
  enlight(getDayHTML(getToday()));
  embold(getHourHTML(getToday(), findCurrentHour()));
  prebold(getHourHTML(getToday(), findNextHour()));
}

// int hour = [0/1...10]
// int day = [1...6]
function getHourHTML(day, hour) {
  const table = document.getElementById('schedule').children[0].children;
  if (hour > 10 || hour < 0) {
    return null;
  }
  const row = table[hour + 1];
  const cell = row.children[day];
  return cell;
}

function getDayHTML(day) {
  let cells = [];
  const table = document.getElementById('schedule').children[0].children;
  for (let hour = 0; hour < 11; hour++) {
    const row = table[hour + 1];
    const cell = row.children[day];
    cells.push(cell);
  }
  return cells;
}

function getToday() {
  return new Date().getDay() + 1;
}

function enlight(htmlObjectArray) {
  if (htmlObjectArray) {
    for (let htmlObject of htmlObjectArray) {
      if (htmlObject) {
        htmlObject.style.backgroundColor = htmlObject.innerHTML.trim() == "" ? 'var(--darkGrey)' : 'var(--yellow)';
      }
    }
  }
}

function embold(htmlObject) {
  if (htmlObject) {
    htmlObject.style.backgroundColor = 'var(--lime)';
  }
}

function prebold(htmlObject) {
  if (htmlObject) {
    htmlObject.style.backgroundColor = 'var(--red)';
  } else {
    prebold(getHourHTML(getToday() + 1, findNextHour()));
  }
}

function findCurrentHour() {
  let now = new Date();
  let time = now.getHours() + ":" + now.getMinutes();
  for (let i = 0; i < ringingHours.length; i++) {
    let s = ringingHours[i][0];
    let e = ringingHours[i][1];
    if (stringTimeCompare(time, s) && !stringTimeCompare(time, e)) {
      return i;
    }
  }
  return -1;
}

function findNextHour() {
  let now = new Date();
  let time = now.getHours() + ":" + now.getMinutes();
  for (let i = 0; i < ringingHours.length - 1; i++) {
    let e = ringingHours[i][1];
    if (stringTimeCompare(time, e)) {
      console.log(stringTimeCompare(time, e));
      return i;
    }
  }
  return -1;
}

// Is t1 later than t2?
function stringTimeCompare(t1, t2) {
  let hur1 = t1.split(":")[0];
  let hur2 = t2.split(":")[0];
  let min1 = t1.split(":")[1];
  let min2 = t2.split(":")[1];
  if (hur1 > hur2) {
    return true;
  } else if (hur1 < hur2) {
    return false;
  } else {
    if (min1 < min2) {
      return false;
    } else {
      return true;
    }
  }
}
