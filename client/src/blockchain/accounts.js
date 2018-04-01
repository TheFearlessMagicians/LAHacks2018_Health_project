import 'babel-polyfill';
const getAccounts = async (web3) =>{
    return await web3.eth.getAccounts();
}
export default getAccounts ;
