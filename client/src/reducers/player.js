import uuid from 'uuid';
const defaultPlayerState= {
 type: ''
};

// filter reducer:
const playerReducer = (state = defaultPlayerState, action) => {
  switch (action.type) {
    case 'ADD_USER':
        return {
            ...action.newPlayer,
            type: 'user',
            id: uuid(),
            currentChallenges:[],
            challengesHistory:[]
        }
    case 'ADD_BETTER':
        return {
            ...action.newPlayer,
            type: 'better',
            id: uuid(),
            currentBets:[],
            bettingHistory:[]
        }
    case 'DELETE_PLAYER':
    return {
        ...state,
        type:'',
        id:uuid(),
        currentChallenges:[],
        challengesHistory:[],
        currentBets:[],
        bettingHistory:[],
        name:''
    }
    default:
      console.log(`PLAYER REDUCER DEFAULTING STATE. got action: ${action.type}`);
      return state;
  }
}
export default playerReducer;
