import { MCQ, Quiz } from "../context/context.types";

export type ACTIONTYPE =
    | { type: "GET_QUIZ", payload: Quiz }
    | { type: "ADD_SCORE", payload: number }
    | { type: "CLEAR_SCORE" }
    | { type: "QUIZ_NAME", payload: string }
    | { type: "IS_ANSWERED", payload: { clickEvents: boolean, clickedButtonId: string | null } }
    | { type: "ADD_STATUS", payload: { playerAnswer: string, questionAsked: MCQ }}
    | { type: "CLEAR_STATUS" }