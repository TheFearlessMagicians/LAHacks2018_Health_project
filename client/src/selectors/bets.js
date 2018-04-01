const getBetsWithChallengeId= (arr,id) => {
    return arr.filter((bet) => {
        return bet.challengeId === id;
    })
}
export {getBetsWithChallengeId} ;
