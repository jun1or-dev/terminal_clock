import dayjs from 'dayjs'

const bum = {
    name: 'bum', // name String
    weekdays: ['Sondô', 'Mondé','Tusedé', 'Nté wua', 'Beletô', 'Nkul éwônga', 'Éwônga'],
    weekdaysShort: [ 'Son.', 'Mon.', 'Tus.', 'Nté.', 'Bel.', 'Nku.', 'Éwô.'],
    weekdaysMin: ['s', 'm', 't', 'n', 'b', 'n', 'é'],
    weekStart: 1,  
    //yearStart: 4, Jan 4th is the first week of the year.
    months: ['Ngon ôsu', 'Ngone baa', 'Ngone lale', 'Ngone nyini', 'Ngone tane', 'Ngone samane', 'Ngone zangbwale', 'Ngone mwomô', 'Ngon ébulu', 'Ngon awôm', 'Ngon awôm a jia', 'Ngon awôm a baa'], // months Array
    monthsShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], // OPTIONAL, short months Array, use first three letters if not provided
    ordinal: n => `${n}º`, // ordinal Function (number) => return number + output
    formats: {
      // abbreviated format options allowing localization
      LTS: 'h:mm:ss A',
      LT: 'h:mm A',
      L: '[n]MM[m]DD[ ya]YYYY',
      LL: 'MMMM D, YYYY',
      LLL: 'MMMM D, YYYY h:mm A',
      LLLL: 'dddd, MMMM D, YYYY h:mm A',
      // lowercase/short, optional formats for localization
      l: 'M-D YYYY',
      ll: 'D MMM, YYYY',
      lll: 'D MMM, YYYY h:mm A',
      llll: 'ddd, MMM D, YYYY h:mm A'
    },
    relativeTime: {
      // relative time format strings, keep %s %d as the same
      future: 'akekui %s', // e.g. in 2 hours, %s been replaced with 2hours
      past: '%s ango\'e',
      s: 'a few seconds',
      m: 'a minute',
      mm: '%d minutes',
      h: 'awolo da',
      hh: 'mewolo %d', // e.g. 2 hours, %d been replaced with 2
      d: 'mose wua',
      dd: 'bemose %d',
      M: 'ngon wua',
      MM: 'mingon %d',
      y: 'mbu wua',
      yy: 'mimbu %d'
    },
    meridiem: (hour, minute, isLowercase) => {
      // OPTIONAL, AM/PM
      return hour > 12 ? 'yn' : 'yt'
    }
  }
dayjs.locale(bum, null, true); // load locale for later use

export default bum;