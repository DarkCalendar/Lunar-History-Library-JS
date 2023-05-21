import LunarDate from "../lib/app.js";

let c = (...c) => console.log(...c);

c(LunarDate.GregorianToLunar(2023, 5, 21), LunarDate.LunarToGregorian(1444, 11, 1), LunarDate.now(), LunarDate.isLeapYearG(2023), LunarDate.isLeapYearL(1444));
