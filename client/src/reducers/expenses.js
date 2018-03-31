
// Expenses reducer - the state is the array of expenses,:
const expensesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter(({id}) => id !==  action.challengeId); // we use 
      // object destructuring syntax here, which is ok.
    case 'EDIT_EXPENSE':
      return state.map(expense => {
        if(expense.id === action.id){
          return {
            ...expense, // this is where the spread operator is useful!
            ...action.updateObj
          }
        }
        return expense;
      });
    default:
      console.log('EXPENSE REDUCER DEFAULTING STATE.');
      return state;
  }
};

export default expensesReducer;
