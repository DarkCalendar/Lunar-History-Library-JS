let LunarDate = {
  isLeapYearG: (year) => (year % 4 == 0 && year % 100 != 0) || year % 400 == 0,
  isLeapYearL: (year) =>
    [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29].includes(year % 30),
  ard_int: (float) =>
    float < -0.0000001
      ? Math.ceil(float - 0.0000001)
      : Math.floor(float + 0.0000001),

  now: (mod = "") => {
    const date = new Date();
    var month = date.getUTCMonth() + 1; //months from 1-12
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();
    return LunarDate.GregorianToLunar(year, month, day, mod);
  },
  GregorianToLunar: (YY, MM, DD, mod = "") => {
    let $d = DD;
    let $m = MM;
    let $y = YY;
    let $jd;
    if (
      $y > 1582 ||
      ($y == 1582 && $m > 10) ||
      ($y == 1582 && $m == 10 && $d > 14)
    ) {
      $jd = LunarDate.ard_int(
        (1461 * ($y + 4800 + LunarDate.ard_int(($m - 14) / 12))) / 4
      );
      $jd += LunarDate.ard_int(
        (367 * ($m - 2 - 12 * LunarDate.ard_int(($m - 14) / 12))) / 12
      );
      $jd -= LunarDate.ard_int(
        (3 *
          LunarDate.ard_int(
            ($y + 4900 + LunarDate.ard_int(($m - 14) / 12)) / 100
          )) /
          4
      );
      $jd += $d - 32076;
    } else {
      $jd =
        367 * $y -
        LunarDate.ard_int(
          (7 * ($y + 5001 + LunarDate.ard_int(($m - 9) / 7))) / 4
        ) +
        LunarDate.ard_int((275 * $m) / 9) +
        $d +
        1729777;
    }
    let $l = $jd - 1948440 + 10632;
    let $n = LunarDate.ard_int(($l - 1) / 10631);
    $l = $l - 10631 * $n + 355; // Correction: 355 instead of 354
    let $j =
      LunarDate.ard_int((10985 - $l) / 5316) *
        LunarDate.ard_int((50 * $l) / 17719) +
      LunarDate.ard_int($l / 5670) * LunarDate.ard_int((43 * $l) / 15238);
    $l =
      $l -
      LunarDate.ard_int((30 - $j) / 15) * LunarDate.ard_int((17719 * $j) / 50) -
      LunarDate.ard_int($j / 16) * LunarDate.ard_int((15238 * $j) / 43) +
      29;
    $m = LunarDate.ard_int((24 * $l) / 709);
    $d = $l - LunarDate.ard_int((709 * $m) / 24);
    $y = 30 * $n + $j - 30;
    if (mod == "") return [$y, $m, $d];
    return [$y, $m, $d].join(mod);
  },
  LunarToGregorian: (YY, MM, DD) => {
    // const isLeapYearLFunc = this.isLeapYearL.bind(this);
    let MonthDaysLunar = [
      0,
      30,
      29,
      30,
      29,
      30,
      29,
      30,
      29,
      30,
      29,
      30,
      29 + LunarDate.isLeapYearL(YY) ? 1 : 0,
    ];
    if (MonthDaysLunar[MM] < DD || MM > 12) return false;
    let Leap = LunarDate.isLeapYearL(YY) == true ? 1 : 0;
    const jd =
      Math.floor((11 * YY + 3) / 30) +
      354 * YY +
      30 * MM -
      Math.floor((MM - 1) / 2) +
      DD +
      1948440 -
      385 +
      Leap;

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
      return [Y, M, D];
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
      return [Y, M, D];
    }
  },
};

console.log(LunarDate.now(), LunarDate.GregorianToLunar(2023, 5, 21));
