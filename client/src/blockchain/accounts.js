import 'babel-polyfill';
const getAccounts = async (web3) =>{
    await web3.eth.getAccounts();
}
export default getAccounts ;
