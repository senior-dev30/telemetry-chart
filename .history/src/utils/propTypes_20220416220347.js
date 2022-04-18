import { arrayOf, shape, string, date as dateProp, number, Date } from "prop-types";

export const MultiLineDataItemsPropTypes = arrayOf(
  shape({
    date: Date,
    value: number
  })
);

export const MultiLineDataPropTypes = arrayOf(
  shape({
    name: string,
    items: MultiLineDataItemsPropTypes,
    color: string
  })
);
