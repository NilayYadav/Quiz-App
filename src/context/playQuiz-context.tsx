import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { ContextType, Quiz, ServerError, Props, QuizStatus } from "./context.types";
import { quizReducer } from "../reducer/quizReducer";
import axios, { AxiosError } from "axios";

const QuizContext = createContext<ContextType>({} as ContextType);

export const initialState = {
  quizData: {} as Quiz,
  isAnswered: {
    clickEvents: false as boolean,
    clickedButtonId: null as null | string,
  },
  quizName: "",
  score: 0,
  quizStatus: [] as QuizStatus[],
};

export async function getQuiz(): Promise<Quiz | ServerError> {
  try {
    const response = await axios.get<Quiz>(
      "https://quizapp.sauravkumar007.repl.co/quizzes"
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }
    console.log(error);
    return { errorMessage: "something snapped!" };
  }
}

export function QuizProvider({ children }: Props) {
  const [loader, setLoader] = useState(false);
  const [state, dispatch] = useReducer(quizReducer, initialState);

  useEffect(() => {
    (async () => {
      setLoader(true);
      const quiz = await getQuiz();
      if ("quiz" in quiz) {
        setLoader(false);
        return dispatch({ type: "GET_QUIZ", payload: quiz });
      }
      return console.log(quiz);
    })();
  }, []);

  return (
    <QuizContext.Provider value={{ state, dispatch, loader }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  return useContext(QuizContext);
}
