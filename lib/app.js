let c = (...c) => console.log(...c);
let isLeapYearG = (year) => (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
let isLeapYearL = (year) => [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29].includes(year % 30);

function convertToGregorian(YY, MM, DD) {
  let MonthDaysLunar = [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29 + isLeapYearL(YY) ? 1 : 0];
  if(MonthDaysLunar[MM] < DD || MM > 12) return false;
  let Leap = isLeapYearL(YY) == true ? 1 : 0;
  const jd = (Math.floor((11 * YY + 3) / 30) + (354) * YY + 30 * MM - Math.floor((MM - 1) / 2) + DD + 1948440 - 385) + Leap;
  
  if (jd > 2299160) {
    let l = jd + 68569;
    let n = Math.floor((4 * l) / 146097);
    // l -= Math.round((146097 * n + 3) / 4);
    l -= Math.round((146097 * n + 3) / 4);
    let i = Math.floor((4000 * (l + 1)) / 1461001);
    l -= Math.floor((1461 * i) / 4) - 31;
    let j = Math.floor((80 * l) / 2447);
    let D = l - Math.floor((2447 * j) / 80);
    l = Math.floor(j / 11);
    let M = j + 2 - 12 * l;
    let Y = 100 * (n - 49) + i + l;
    
    return `${Y}-${M}-${D}a`;
  } else {
    let j = jd + 1402;
    let k = Math.floor((j - 1) / 1461);
    let l = j - 1461 * k;
    let n = Math.floor((l - 1) / 365) - Math.floor(l / 1461);
    let i = l - 365 * n + 29;
    j = Math.floor((80 * i) / 2447);
    let D = i - Math.floor((2447 * j) / 80);
    i = Math.floor(j / 11);
    let Y = 4 * k + n + i - 4716;
    let M = j + 2 - 12 * i;
    
    return `${Y}-${M}-${D} cc`;
  }
} 

c(convertToGregorian(1444, 10, 29));