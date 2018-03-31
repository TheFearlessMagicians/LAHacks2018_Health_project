import moment from 'moment';
// filter default state:
const defaultFilterState = 
   {
    text: '',
    sortBy: 'date', // date or amount
    startDate: moment().startOf('month'),// moment method:
    // The start of the current month.
    endDate: moment().endOf('month') //moment method:
    // the end of the current month.
  };

// filter reducer:
const filterReducer = (state = defaultFilterState, action) => {
  switch (action.type) {
    case 'SET_FILTER_TEXT':
        return {
          ...state, // NOTE: we spread out our state object, because this is
          // referring to the whole filter object, NOT THE ENTIRE REDUX STATE.
          // THIS IS THE USE OF ISOLATING REDUCERS, we aren't concerned
          // about the other unrelated states.
          text: action.text // we override the 'text' key's value.
        } 
    case 'SORT_BY_DATE':
        return {
          ...state,
          sortBy: 'date' // we override the 'sortBy' key's value.
        } 
    case 'SORT_BY_AMOUNT':
        return {
          ...state,
          sortBy: 'amount' // we override the 'sortBy' key's value.
        } 
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.date
      }
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.date 
      }
    default:
      console.log(`FILTER REDUCER DEFAULTING STATE. got action: ${action.type}`);
      return state;
  }
}
export default filterReducer;
