import uuid from 'uuid';
export const addChallenge = ( newChallenge) => ({
  type: 'ADD_CHALLENGE',
  newChallenge: {
      ...newChallenge,
      currentBets: [], // defaulting this. There shouldn't be any bettings
      // as soon as challenge is set up.
      progress : []
  }
});

export const removeExpense = (challengeId) => {
  if( typeof id === 'undefined')
    return {};
  return {
    'type': 'REMOVE_CHALLENGE',
    challengeId
  }
}

export const editExpense = (challengeId,updatedChallenge) => ({
  type: 'EDIT_CHALLENGE',
  challengeId,
  updatedChallenge
})
