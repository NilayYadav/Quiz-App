import { useQuiz } from "../../context/playQuiz-context";
import { Spinner, Box, VStack, Text, Container, useMediaQuery, useDisclosure } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { MCQ } from "../../context/context.types";
import { useState, useEffect } from "react";
import { QuestionCard, QuizDetail } from "../../components/index";

export function QuizPage(): JSX.Element {
  const [questionNumber, setNumber] = useState(0);
  const { state, dispatch, loader } = useQuiz();
  const [isLargerThan580] = useMediaQuery("(min-width: 580px)");

  const navigate = useNavigate();
  const location = useLocation();
  const splitURL = location.pathname.split("/");
  const quizId = splitURL[splitURL.length - 1];

  const getQuiz = state.quizData.quiz?.find((item) => item._id === quizId);
  const mcq = getQuiz?.mcq[questionNumber] as MCQ;
  const quizLength = getQuiz?.mcq.length;

  const { isOpen, onOpen, onClose } = useDisclosure()
  
  
  useEffect(() => onOpen(), [onOpen]);


  useEffect(() => {
    let changeQuestion: ReturnType<typeof setTimeout>;
    if (quizLength !== undefined) {
      if (questionNumber === quizLength) {
        return navigate("/scores");
      } else if (state.isAnswered.clickEvents) {
            changeQuestion = setTimeout(() => {
            setNumber((num) => num + 1);
            dispatch({
                type: "IS_ANSWERED",
                payload: { clickEvents: false, clickedButtonId: null },
            });
            }, 1000);
        }
    }

    return () => clearTimeout(changeQuestion);

  }, [
    state.isAnswered.clickEvents,
    dispatch,
    navigate,
    quizLength,
    questionNumber
  ]);

  return (
    <>
    {
      loader ? 
        <Box
          height="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner size="lg" />
        </Box>
      :
        <div>
          <QuizDetail
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            totalQuestion={quizLength}
          />
          <VStack spacing={4} pt="1.5rem" mt="5rem" mx="0.5rem">
            <Container
              w="100%"
              fontSize="1.1rem"
              fontWeight="bold"
              colorScheme="gray.100"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text ml={isLargerThan580 ? "1rem" : "0"}>
                Question: {questionNumber + 1} / {quizLength}
              </Text>
              <Text mr={isLargerThan580 ? "1rem" : "0"}>Point: {mcq?.points}</Text>
            </Container>

            <QuestionCard
              _id={mcq?._id}
              question={mcq?.question}
              points={mcq?.points}
              options={mcq?.options}
            />
          </VStack>            
        </div>
        
    }
    </>

  );
}
