import uuid from 'uuid';
export const addChallenge = ( newChallenge) => ({
  type: 'ADD_CHALLENGE',
  newChallenge: {
  currentBets: [], // defaulting this. There shouldn't be any bettings
      // as soon as challenge is set up.
      progress : [],

      ...newChallenge,
      workoutsCompleted:0
      }
});

export const removeExpense = (challengeId) => {
  if( typeof challengeId === 'undefined')
    return {};
  return {
    'type': 'REMOVE_CHALLENGE',
    challengeId
  }
}

export const editExpense = (challengeId, updatedChallenge) => ({
  type: 'EDIT_CHALLENGE',
  challengeId,
  updatedChallenge
})
