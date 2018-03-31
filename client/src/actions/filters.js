

export const setTextFilter= (text = '')=> ({
  type: 'SET_FILTER_TEXT',
  text
});

export const sortByAmount = () => ({
  type:'SORT_BY_AMOUNT',
});
export const sortByDate = () => ({

  type:'SORT_BY_DATE',
});

export const setStartDate = (d) => ({
  type :'SET_START_DATE',
  date: d
});

export const setEndDate = (d) => ({
  type: 'SET_END_DATE',
  date: d
});
