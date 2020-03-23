  const initState = {
    productList: []
  }
  
  const rootReducer = (state = initState, action) => {
    console.log(action.type);
    if(action.type === 'ADD_TO_CART'){
        console.log(action.object);
        if(state.productList.find((obj) => obj._id === action.object._id)) {
          state.productList = state.productList.map((obj) => {
            if(obj._id === action.object._id) {
              return action.object;
            } else return obj;
          });
        } else state.productList.push(action.object);
        return state;
    } else if(action.type === 'REMOVE_FROM_CART'){
        console.log(action.object);
        const tempList = state.productList.filter((obj) => obj._id !== action.object._id);
        state.productList = tempList;
        return state;
    } else if(action.type === 'CLEAR_CART'){
      console.log(action.data);
      state.productList = [];
      return state;
    }
    console.log('State', state);
    return state;
  }
  
  export default rootReducer;