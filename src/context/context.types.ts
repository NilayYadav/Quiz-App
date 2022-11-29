import React, { Dispatch, SetStateAction } from "react";
import { ACTIONTYPE } from "../reducer/reducer.types";
import { initialState } from "./playQuiz-context";

export type Props = {
  children: React.ReactNode;
};

export type UserToken = {
  email: string;
  success: boolean;
  token: string;
};

export type AuthContextType = {
  login: boolean;
  token: string | null;
  toggleCard: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
  loginUserwithGmail: (gamilToken: string) => void;
  logout: () => void;
};

export type ContextType = {
  state: typeof initialState;
  dispatch: (action: ACTIONTYPE) => void;
  loader: boolean;
};

export type ServerError = {
  errorMessage: string;
};

export type QuizStatus = {
  playerAnswer: string;
  questionAsked: MCQ;
};

export type OPTIONS = {
  _id: string;
  text: string;
  isCorrect: boolean;
};

export type MCQ = {
  _id: string;
  question: string;
  points: number;
  options: OPTIONS[] | undefined;
};

export type QUIZ = {
  _id: string;
  name: string;
  image: string;
  mcq: MCQ[];
};

export type Quiz = {
  quiz: QUIZ[] | undefined;
};
