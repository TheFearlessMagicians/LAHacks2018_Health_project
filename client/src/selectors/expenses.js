import moment from 'moment';
const getVisibleExpenses = (expenses,{text,sortBy,startDate,endDate}) => { 
  // we destructure the filter object.
  return expenses.filter(expense => {
    // const startDateMatch = typeof startDate === 'undefined' || expense.createdAt >= startDate;
    //const endDateMatch= typeof endDate === 'undefined' || expense.createdAt <= endDate;

    const createdAtMoment = moment(expense.createdAt);
    const startDateMatch = startDate? startDate.isSameOrBefore(createdAtMoment) : true;
    const endDateMatch = endDate? endDate.isSameOrAfter(createdAtMoment):true;
    // figure out if expense.description contains the text variable string inside of it.
    // we use the includes method. convert both strings to lower case. 
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b)=> {
    if(sortBy == 'date')
      return a.createdAt < b.createdAt ? 1 : -1; // recent expenses first.
    else if(sortBy =='amount')
      return a.amount < b.amount ? 1 : -1; // sort by price.

  });
};

export default getVisibleExpenses;
