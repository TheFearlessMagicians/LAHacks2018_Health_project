const defaultChallengesState= [];

// filter reducer:
const challengesReducer = (state = defaultChallengesState, action) => {
  switch (action.type) {
    case 'ADD_CHALLENGE':
        return state.concat(action.newChallenge);
    case 'REMOVE_CHALLENGE':
        return state.filter((challenge) => challenge.challengeId !== action.challengeId);
    case 'FINISHED_WORKOUT':
    return state.map((challenge) => {
        if(challenge.challengeId == action.id)
            return {
                ...challenge,
                workoutsCompleted:challenge.workoutsCompleted.concat(action.caloriesPerWorkout)
            };
        return challenge
    });

    case 'EDIT_CHALLENGE':
        return state.map(challenge => {
            if(challenge.challengeId === action.challengeId)
                return {
                    ...challenge,
                    ...action.updatedChallenge
                }
            else
                return challenge;

        });
    default:
      console.log(`CHALLENGES REDUCER DEFAULTING STATE. got action: ${action.type}`);
      return state;
  }
}
export default challengesReducer;
