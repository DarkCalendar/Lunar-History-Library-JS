import LunarDate from "../lib/app.js";

let c = (...c) => console.log(...c);
let date = new Date();
var month = date.getUTCMonth() + 1;
var day = date.getUTCDate();
var year = date.getUTCFullYear();
date = `${year}-${month}-${day}`;
let lunar = LunarDate.now("-");
c(
  "Now date lunar test =>   ",
  `Today ${date} Gregorian is equivalent to lunar ${lunar}.\n\n`
);

let leapYear = LunarDate.now()[0];
let checkLeap = LunarDate.isLeapYearL(leapYear);
let msgLeap = "";
if (!checkLeap) {
  for (let i = 0; i < 4; i++) {
    leapYear++;
    if (LunarDate.isLeapYearL(leapYear)) {
      break;
    }
    continue;
  }
  msgLeap = `This year was not a lunar leap year, but the closest lunar leap year is ${leapYear}.\n\n`;
} else {
  for (let i = 0; i < 4; i++) {
    leapYear++;
    if (LunarDate.isLeapYearL(leapYear)) {
      break;
    }
    continue;
  }
  msgLeap = `This year was a lunar leap year, but the closest lunar leap year is ${leapYear}.\n\n`;
}
c("check Leap lunar year =>  ", msgLeap);

c(
  "Global Test =>  ",
  LunarDate.GregorianToLunar(2023, 5, 21),
  LunarDate.LunarToGregorian(1444, 11, 1),
  LunarDate.now(),
  LunarDate.isLeapYearG(2023),
  LunarDate.isLeapYearL(1444)
);
