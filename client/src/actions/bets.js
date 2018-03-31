export const addBet = ( newBet) => ({
      type: 'ADD_BET',
      newBet
  }
);

export const removeBet = (betId) => {
  if( typeof betId === 'undefined')
    return {};
  return {
    'type': 'REMOVE_BET',
    betId
  }
};

export const editExpense = (betId,updatedBet) => ({
  type: 'EDIT_BET',
  betId,
  updatedBet
});
