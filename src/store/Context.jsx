import React, { useState, useContext, useReducer, useEffect } from 'react';
import Data from '../Data';
import Reducer from './Reducer';

const url = 'https://course-api.com/react-useReducer-cart-project';
const AppContext = React.createContext();
const initialState = {
  loading: false,
  cart: Data,
  total: 0,
  amount: 0,
};

const AppProvider = ({ children }) => {
  //! NB- cartState is equal to the initialState object above
  const [cartState, dispatch] = useReducer(Reducer, initialState);

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const onRemove = (id) => {
    dispatch({ type: 'REMOVE', payload: id });
  };

  const onIncrease = (id) => {
    dispatch({ type: 'INCREASE', payload: id });
  };

  const onDecrease = (id) => {
    dispatch({ type: 'DECREASE', payload: id });
  };

  const fetchData = async () => {
    dispatch({ type: 'LOADING' });
    const res = await fetch(url);
    const fetchedCartData = await res.json();
    dispatch({ type: 'DISPLAY_ITEMS', payload: fetchedCartData });
  };

  const refractorAmountFunc = (id, type) => {
    dispatch({ type: 'TOGGLE_AMOUNT', payload: { id, type } });
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    dispatch({ type: 'GET_TOTALS' });
  }, [cartState.cart]);
  return (
    //! NB- we are passing all the key-pair properties in the initialState as cartState to the App wide context
    <AppContext.Provider
      value={{
        ...cartState,
        clearCart,
        onRemove,
        onIncrease,
        onDecrease,
        refractorAmountFunc,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext };
