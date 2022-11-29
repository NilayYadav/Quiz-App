import { Quiz, QuizStatus } from "../context/context.types";
import { quizReducer } from "./quizReducer";
import { ACTIONTYPE } from "./reducer.types";

describe("testing quiz reducer", () => {

    const dummyQuizData = [{
        _id: "121",
        name: 'first quiz',
        image: 'quizImage',
        mcq: [
            {
                _id: '1211',
                question: 'first question',
                points: 5,
                options: [
                    {
                        _id: '12111',
                        text: 'option One',
                        isCorrect: true,

                    },
                    {
                        _id: '12112',
                        text: 'option Two',
                        isCorrect: false,

                    }
                    
                ]
            }
        ]
    }];


    it("get quiz data", () => {
        const initialState = {
            quizData: {} as Quiz,
            isAnswered: {
              clickEvents: false as boolean,
              clickedButtonId: null as null | string,
            },
            quizName: "",
            score: 0,
            quizStatus: [] as QuizStatus[],
        };

        const getQuiz: ACTIONTYPE = {
            type: "GET_QUIZ",
            payload: {
                quiz: dummyQuizData
            }
        }

        const quizState = quizReducer(initialState, getQuiz);

        expect(quizState).toEqual({
            quizData: {
                quiz: dummyQuizData
            },
            isAnswered: {
              clickEvents: false,
              clickedButtonId: null,
            },
            quizName: "",
            score: 0,
            quizStatus: [],
        });
    });


    it("should get answer id and toggle cliked events", () => {
        const initialState = {
            quizData: {quiz: dummyQuizData},
            isAnswered: {
              clickEvents: false as boolean,
              clickedButtonId: null as null | string,
            },
            quizName: "",
            score: 0,
            quizStatus: [] as QuizStatus[],
        }

        const getUserAnswerId: ACTIONTYPE = {
            type: "IS_ANSWERED",
            payload: { clickEvents: true, clickedButtonId: "12112"}
        }

        const quizState = quizReducer(initialState, getUserAnswerId);

        expect(quizState).toEqual({
            quizData: { quiz: dummyQuizData },
            isAnswered: {
              clickEvents: true,
              clickedButtonId: "12112",
            },
            quizName: "",
            score: 0,
            quizStatus: [],
        })
    });


    it("should add score", () => {
        const initialState = {
            quizData: { quiz: dummyQuizData },
            isAnswered: {
              clickEvents: false as boolean,
              clickedButtonId: null as null | string,
            },
            quizName: "",
            score: 0,
            quizStatus: [] as QuizStatus[],
        }

        const addScore: ACTIONTYPE = {
            type: "ADD_SCORE",
            payload: 5
        }

        let quizState = quizReducer(initialState, addScore);

        expect(quizState).toEqual({
            quizData: { quiz: dummyQuizData },
            isAnswered: {
              clickEvents: false,
              clickedButtonId: null,
            },
            quizName: "",
            score: 5,
            quizStatus: [],
        });

        quizState = quizReducer(quizState, addScore);

        expect(quizState).toEqual({
            quizData: { quiz: dummyQuizData },
            isAnswered: {
              clickEvents: false,
              clickedButtonId: null,
            },
            quizName: "",
            score: 10,
            quizStatus: [],
        })
    });

    it("should set score equal to zero", () => {
        const initialState = {
            quizData: { quiz: dummyQuizData },
            isAnswered: {
              clickEvents: false as boolean,
              clickedButtonId: null as null | string,
            },
            quizName: "",
            score: 10,
            quizStatus: [] as QuizStatus[],
        }

        const clearScore:ACTIONTYPE ={
            type:"CLEAR_SCORE"
        }

        const quizState = quizReducer(initialState, clearScore);

        expect(quizState).toEqual({
            quizData: { quiz: dummyQuizData },
            isAnswered: {
              clickEvents: false,
              clickedButtonId: null,
            },
            quizName: "",
            score: 0,
            quizStatus: [],
        });

    })


    it("should add quiz name", () => {
        const initialState = {
            quizData: { quiz: dummyQuizData },
            isAnswered: {
              clickEvents: false as boolean,
              clickedButtonId: null as null | string,
            },
            quizName: "",
            score: 0,
            quizStatus: [] as QuizStatus[],
        }

        const getQuizName: ACTIONTYPE = {
            type: "QUIZ_NAME",
            payload: "Science Quiz"
        }

        const quizState = quizReducer(initialState, getQuizName);

        expect(quizState).toEqual({
            quizData: { quiz: dummyQuizData },
            isAnswered: {
              clickEvents: false,
              clickedButtonId: null,
            },
            quizName: "science",
            score: 0,
            quizStatus: [],
        })
    });

    it("Should add quiz status", () => {
        const initialState = {
            quizData: { quiz: dummyQuizData },
            isAnswered: {
              clickEvents: false as boolean,
              clickedButtonId: null as null | string,
            },
            quizName: "",
            score: 0,
            quizStatus: [] as QuizStatus[],
        }

        const addQuizStatus: ACTIONTYPE = {
            type: "ADD_STATUS",
            payload: {
                playerAnswer: "12112",
                questionAsked: {
                     _id: "1211", 
                     question: "first question", 
                     points: 5, 
                     options:  [
                        {
                            _id: '12111',
                            text: 'option One',
                            isCorrect: true,
    
                        },
                        {
                            _id: '12112',
                            text: 'option Two',
                            isCorrect: false,
    
                        }
                        
                    ]
                }
            }
        }

        const quizState = quizReducer(initialState, addQuizStatus);

        expect(quizState).toEqual({
            quizData: { quiz: dummyQuizData },
            isAnswered: {
              clickEvents: false,
              clickedButtonId: null,
            },
            quizName: "",
            score: 0,
            quizStatus: [
                {
                    playerAnswer: "12112",
                    questionAsked: {
                         _id: "1211", 
                         question: "first question", 
                         points: 5, 
                         options:  [
                            {
                                _id: '12111',
                                text: 'option One',
                                isCorrect: true,
        
                            },
                            {
                                _id: '12112',
                                text: 'option Two',
                                isCorrect: false,
        
                            }
                            
                        ]
                    }
                }
            ],
        })
    });

    it("should clear quiz status", () => {
        const initialState = {
            quizData: { quiz: dummyQuizData },
            isAnswered: {
              clickEvents: false as boolean,
              clickedButtonId: null as null | string,
            },
            quizName: "",
            score: 0,
            quizStatus: [
                {
                    playerAnswer: "12112",
                    questionAsked: {
                         _id: "1211", 
                         question: "first question", 
                         points: 5, 
                         options:  [
                            {
                                _id: '12111',
                                text: 'option One',
                                isCorrect: true,
        
                            },
                            {
                                _id: '12112',
                                text: 'option Two',
                                isCorrect: false,
        
                            }
                            
                        ]
                    }
                }
            ],
        }

        const clearStatus: ACTIONTYPE = {
            type: "CLEAR_STATUS"
        }

        const quizState = quizReducer(initialState, clearStatus);

        expect(quizState).toEqual({
            quizData: { quiz: dummyQuizData },
            isAnswered: {
              clickEvents: false,
              clickedButtonId: null,
            },
            quizName: "",
            score: 0,
            quizStatus: [],
        })
    })
});