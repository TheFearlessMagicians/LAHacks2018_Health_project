import uuid from 'uuid';
export const addExpense = (
  {
    description = '', 
    note = '', 
    amount = 0, 
    createdAt = 0
  } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(), // generate a random uuid.
    description,
    note,
    amount,
    createdAt
  }
});


export const removeExpense = ({id} = {}) => { // ID MUST BE FILLED. NO DEFAULTS
  if( typeof id === 'undefined')
    return {};
  return {
    'type': 'REMOVE_EXPENSE',
    'id': id
  }

}

export const editExpense = (id,updateObj) => ({
  type: 'EDIT_EXPENSE',
  id,
  updateObj
})

