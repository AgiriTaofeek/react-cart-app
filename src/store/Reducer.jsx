const Reducer = (currentState, action) => {
  switch (action.type) {
    //* first case
    case 'CLEAR_CART':
      return { ...currentState, cart: [] };
    //* second case
    case 'REMOVE':
      return {
        ...currentState,
        cart: currentState.cart.filter((item) => {
          return item.id !== action.payload;
        }),
      };
    //* third case
    case 'INCREASE':
      let tempCartPlus = currentState.cart.map((item) => {
        if (item.id === action.payload) {
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });
      return { ...currentState, cart: tempCartPlus };
    //* fourth case
    case 'DECREASE':
      let tempCartMinus = currentState.cart
        .map((item) => {
          if (item.id === action.payload) {
            return { ...item, amount: item.amount - 1 };
          }
          return item;
        })
        .filter((item) => item.amount !== 0);
      return { ...currentState, cart: tempCartMinus };
    //* fifth case
    case 'GET_TOTALS':
      let { total, amount } = currentState.cart.reduce(
        (acc, item) => {
          const { price, amount } = item;
          acc.amount += amount;
          const GrandTotal = price * amount;
          acc.total += GrandTotal;
          return acc;
        },
        {
          total: 0,
          amount: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      return { ...currentState, total, amount };
    //* sixth case
    case 'LOADING':
      return { ...currentState, loading: true };
    //* seventh case
    case 'DISPLAY_ITEMS':
      return { ...currentState, cart: action.payload, loading: false };
    //! Refractor case
    case 'TOGGLE_AMOUNT':
      let tempData = currentState.cart
        .map((item) => {
          if (item.id === action.payload.id) {
            if (action.payload.type === 'INCREASE')
              return { ...item, amount: item.amount + 1 };
            if (action.payload.type === 'DECREASE')
              return { ...item, amount: item.amount - 1 };
          }
          return item;
        })
        .filter((item) => item.amount !== 0);
      return { ...currentState, cart: tempData };
    //   default:
    //       return currentState;
    default:
      throw new Error('no match');
  }
};

export default Reducer;
