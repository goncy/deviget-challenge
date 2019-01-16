import {distanceInWordsToNow} from "date-fns";

const dateToWords = (date: number) =>
  distanceInWordsToNow(date * 1000, {addSuffix: true});

export default dateToWords;
