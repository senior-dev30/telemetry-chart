import { arrayOf, shape, string, date as dateProp, number } from "prop-types";

export const MultiLineDataItemsPropTypes = arrayOf(
  shape({
    date: PropTypes.instanceOf(Date),
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
