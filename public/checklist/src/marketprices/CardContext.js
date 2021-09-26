import React, { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

export const defaultCardState = {
  displayCards: [],
};
export const initialCardState = { ...defaultCardState };

const UPDATE_CARDS = "update-cards";

const CardContext = createContext();
const useCardContext = () => useContext(CardContext);
const cardReducer = (state = initialCardState, action) => {
  switch (action.type) {
    case UPDATE_CARDS: {
      return { ...state, displayCards: action.displayCards };
    }
    default:
      return state;
  }
};

const CardContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cardReducer, initialCardState);
  return (
    <CardContext.Provider value={{ state, dispatch }}>
      {children}
    </CardContext.Provider>
  );
};

CardContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

const updateCards = (displayCards) => ({ type: UPDATE_CARDS, displayCards });

export { CardContextProvider, useCardContext, updateCards };
