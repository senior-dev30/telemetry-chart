import PropTypes from 'prop-types';

export const MultiLineDataItemsPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    date: PropTypes.Date,
    value: PropTypes.number
  })
);

export const MultiLineDataPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string,
    items: MultiLineDataItemsPropTypes,
    color: PropTypes.string
  })
);
