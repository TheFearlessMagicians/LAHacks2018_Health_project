

const betsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_BET':
      return [...state, action.newBet];
    case 'REMOVE_BET':
      return state.filter(({id}) => id !==  action.betId); // we use
      // object destructuring syntax here, which is ok.
    case 'EDIT_BET':
      return state.map(bet => {
        if(bet.id === action.betId){
          return {
            ...bet, // this is where the spread operator is useful!
            ...action.updatedBet
          }
        }
        return bet;
      });
    default:
      console.log('BETS REDUCER DEFAULTING STATE.');
      return state;
  }
};

export default betsReducer;
