import { initialState } from "../context/playQuiz-context";
import { ACTIONTYPE } from "./reducer.types";

export const quizReducer = (state: typeof initialState, action: ACTIONTYPE) => {
  switch (action.type) {
    case "GET_QUIZ":
      return { ...state, quizData: action.payload };

    case "IS_ANSWERED":
      return {
        ...state,
        isAnswered: {
          clickEvents: action.payload.clickEvents,
          clickedButtonId: action.payload.clickedButtonId,
        },
      };

    case "ADD_SCORE":
      return { ...state, score: state.score + action.payload };

    case "CLEAR_SCORE":
      return { ...state, score: 0 };

    case "QUIZ_NAME":
      return { ...state, quizName: action.payload.split(" ")[0].toLowerCase() };

    case "ADD_STATUS":
      return { ...state, quizStatus: [...state.quizStatus, action.payload] };

    case "CLEAR_STATUS":
      return { ...state, quizStatus: [] };
      
    default:
      return state;
  }
};
