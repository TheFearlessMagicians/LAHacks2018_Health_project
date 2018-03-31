pragma solidity ^0.4.17;

contract Exercise {
    
    uint public start;
    uint public end;
    uint public frequency; //frequency of workout int times/week 
    uint public calorieTarget;
    uint[] public workouts;
    address public owner; //the person who deploys the contract
    uint public day = 0;
    bool deposited = false;
    uint workoutCount = 0;
    uint totalBetAgainst = 0;
    
    //keeping track of all bets
    struct bet {
        address betterAddress;
        uint betValue;
    }
    bet [] bets;

    modifier isEndTimeValid (uint time) {
        require (time >= day); //greater than 1 day
        _;
    }
    
    modifier isOwner (){
        require(msg.sender == owner);
        _;
    }
    modifier hasDeposited(){
        require(deposited);
        _;
    }
    
    modifier isActive (){ //modifier to check if a contract is active !
        require(/*now <= end*/true);
        _;
    }
    
    modifier reachedCalorieTarget (uint _calories){
        require(_calories >= calorieTarget);
        _;
    }

    function Exercise (uint _frequency, uint _calorieTarget, uint _end) public isEndTimeValid(_end) {
        require(_calorieTarget > 0);
        start = now;
        // end = start + 86400; //ends at 7 days from the start of the contract.
        // //A little leeway added due to non instantaneous nature of block chain
        end = start + _end;
        end = 0; //SO SKETCH I KNOW!
        frequency = _frequency; 
        calorieTarget = _calorieTarget;
        owner = msg.sender;
    }
    
    function deposit () public isOwner payable {
        require (msg.value > .01 ether);
        require(!deposited);
        deposited = true;
    }
    
    function submitBet () public payable {
        require (msg.sender != owner);
        bets.push(bet(msg.sender, msg.value));
        totalBetAgainst += msg.value;
    }
    
    function logWorkOut (uint _calories) public isOwner reachedCalorieTarget(_calories) hasDeposited{
        workouts.push(_calories);
        workoutCount++;
    }
    
    function getWorkouts () public constant returns (uint[]) {
        return workouts;
    }
    
    function getNumBets () public constant returns (uint) {
        return bets.length;
    }
    
    function getBet (uint index) public constant returns (address, uint){
        return (bets[index].betterAddress, bets[index].betValue);
    }
    
    function pay (address dest, uint money) public {
        if (address(this).balance < money){
            dest.transfer(address(this).balance);
        } else {
            dest.transfer(money);
        }
    }
    function getBalance () public constant returns(uint){
        return address(this).balance;
    }
    
    function getWorkoutCount() public constant returns (uint){
        return workoutCount;
    }
    
}