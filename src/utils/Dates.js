// Some helper functions for processing dates.

export default {
  // Known weakness in the yyymmdd(). Do not let this calculate into the previous month as days will not be calculated correctly. You can get day 00 which is incorrect.
  yyyymmdd: (yearOffset, dayOffset) => {
    let d = new Date();
    let mm = d.getMonth() + 1; // getMonth() is zero-based
    let dd = d.getDate() - dayOffset;

    return [d.getFullYear() - yearOffset,
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
    ].join('/');
  },
  // Similar to yyyymmdd, however you can give any input for month, day, year
  yyyymmddCustom: (month, day, year) => {
    return [year,
      (month > 9 ? '' : '0') + month,
      (day > 9 ? '' : '0') + day
    ].join('/');
  },
  firstDay: function (month) {
    // Initializes date variable
    let d = new Date();
    // Gets this year
    let year = d.getFullYear();
    // Formates date variable. Will handle negative months, will go back months. Handles going back to a previous year also
    let calcDate = new Date(year, month, 1);
    // Formats into pretty string; ex. "2017/09/01"
    return this.yyyymmddCustom(calcDate.getMonth() + 1, calcDate.getDate(), calcDate.getFullYear());
  },
  lastDay: function (month) {
    // Initializes date variable
    let d = new Date();
    // Gets this year
    let year = d.getFullYear();
    // Formates date variable. Will handle negative months, will go back months. Handles going back to a previous year also
    let ins3 = new Date(year, month + 1, 0);
    // Formats into pretty string; ex. "2017/09/30"
    return this.yyyymmddCustom(ins3.getMonth() + 1, ins3.getDate(), ins3.getFullYear());
  },
  todaysDate: function () {
    return this.yyyymmdd(0, 0);
  },
  yesterdaysDate: function () {
    // Need to catch and handle differently 'first days of the month', as this naturally will produce a 00 day date, which will cause error. ie 2019/02/00
    
    return this.yyyymmdd(0, 1);
  },
  previousMonthLastDay: function () {
    let nowDate = new Date()
    // Get month of now
    let month = nowDate.getMonth()
    // subtract one
    month --
    // send to this.lastDay()
    return this.lastDay(month)
  },
  previousYearToday: function () {
    return this.yyyymmdd(1, 0);
  },
  firstDayFirstMonthLastYear: function () {
    return this.yyyymmddCustom(1, 1, this.previousYear());
  },
  previousYear: function () {
    return new Date().getFullYear() - 1;
  },
  /* 
function get12MonthEvalDates
@param todaysDate - Simple Number
@param currentMonth - Simple Number

@return {
	evalFirstDay, // String - Ex. "2017/09/01"
	evalLastDay // String - Ex. "2017/11/30"
}

*/
  get12MonthEvalDates: function get12MonthEvalDates(todaysDate, currentMonth) {
    // Setting Variables
    let monthToStartFrom;
    let monthToEndAt;
    // For Readability
    let oneMonth = 1;
    let twoMonths = 2;
    let twelveMonths = 12;
    let thirteenMonths = 13;
    // Account for computer seeing month on a 0 basis. Ex January is month 0, not month 1
    currentMonth--;

    // Logic
    if (todaysDate > 5 && todaysDate < 20) {

      // Look at forecasted evaluation
      // First Month
      monthToStartFrom = currentMonth - twelveMonths;
      // Last Month
      monthToEndAt = currentMonth - oneMonth;

    }
    else {

      // Look at Current Seller Level
      // First Month
      monthToStartFrom = currentMonth - thirteenMonths;
      // Last Month
      monthToEndAt = currentMonth - twoMonths;

    }

    // This will Handle when months goes into the previous year
    // Give me formatted date of monthToStartFrom.firstDay and monthToEndAt.LastDay
    let monthToStartFromFirstDay = this.firstDay(monthToStartFrom);
    let monthToEndAtLastDay = this.lastDay(monthToEndAt);

    return {
      evalFirstDay: monthToStartFromFirstDay,
      evalLastDay: monthToEndAtLastDay
    }
  },
  /* 
  function get3MonthEvalDates
  @param todaysDate - Simple Number
  @param currentMonth - Simple Number
  
  @return {
    evalFirstDay, // String - Ex. "2017/09/01"
    evalLastDay // String - Ex. "2017/11/30"
  }
  
  */
  get3MonthEvalDates: function get3MonthEvalDates(todaysDate, currentMonth) {
    // Setting Variables
    let monthToStartFrom;
    let monthToEndAt;
    // For Readability
    let oneMonth = 1;
    let twoMonths = 2;
    let threeMonths = 3;
    let fourMonths = 4;
    // Account for computer seeing month on a 0 basis. Ex January is month 0, not month 1
    currentMonth--;

    // Logic
    if (todaysDate > 5 && todaysDate < 20) {

      // Look at forecasted evaluation
      // First Month
      monthToStartFrom = currentMonth - threeMonths;
      // Last Month
      monthToEndAt = currentMonth - oneMonth;

    }
    else {

      // Look at Current Seller Level
      // First Month
      monthToStartFrom = currentMonth - fourMonths;
      // Last Month
      monthToEndAt = currentMonth - twoMonths;

    }

    // This will Handle when months goes into the previous year
    // Give me formatted date of monthToStartFrom.firstDay and monthToEndAt.LastDay
    let monthToStartFromFirstDay = this.firstDay(monthToStartFrom);
    let monthToEndAtLastDay = this.lastDay(monthToEndAt)

    return {
      evalFirstDay: monthToStartFromFirstDay,
      evalLastDay: monthToEndAtLastDay
    }
  },
  getEvalDates: function (threeMonthCount) {
    // Get todays date and month
    let d = new Date();
    let mm = d.getMonth() + 1; // getMonth() is zero-based
    let dd = d.getDate();

    // Variable for holding response object
    let getEval;
    // Logic
    if (threeMonthCount >= 400) {
      // Do a 3 month lookback
      getEval = this.get3MonthEvalDates(dd, mm);
    }
    else {
      // Do a 12 month lookback
      getEval = this.get12MonthEvalDates(dd, mm);
    }
    // Destructuring the response object
    let { evalFirstDay, evalLastDay } = getEval;
    // Returning the important data
    return {
        threeMonthCount: threeMonthCount,
        from: evalFirstDay,
        to: evalLastDay
    }
  }
};
