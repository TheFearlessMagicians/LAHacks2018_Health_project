

export const addUser= (newPlayer)=> ({
  type: 'ADD_USER',
  newPlayer
});

export const addBetter= (newPlayer)=> ({
  type: 'ADD_BETTER',
  newPlayer
})
export const removePlayer = ()=> ({
    type:'DELETE_PLAYER'
})
