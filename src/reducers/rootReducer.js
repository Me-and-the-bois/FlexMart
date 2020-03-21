  const initState = {
    productList: []
  }
  
  const rootReducer = (state = initState, action) => {
    console.log(action.type);
    if(action.type === 'ADD_TO_CART'){
        console.log(action.object);
        state.productList.push(action.object);
        return state;
    }
    console.log('State', state);
    return state;
  }
  
  export default rootReducer