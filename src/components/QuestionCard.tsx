import { Container, Text, VStack, Button } from "@chakra-ui/react";
import { MCQ } from "../context/context.types";
import { useQuiz } from "../context/playQuiz-context";

export function QuestionCard({
  _id: questionId,
  question,
  points,
  options,
}: MCQ) {
  const { state, dispatch } = useQuiz();
  const { isAnswered } = state;

  const checkAnswer = (isCorrect: boolean, answerId: string) => {
    dispatch({
      type: "ADD_STATUS",
      payload: {
        playerAnswer: answerId,
        questionAsked: { _id: questionId, question, points, options },
      },
    });
    dispatch({
      type: "IS_ANSWERED",
      payload: { clickEvents: true, clickedButtonId: answerId },
    });
    if (isCorrect) {
      return dispatch({ type: "ADD_SCORE", payload: points });
    }
  };

  return (
    <Container p="1.5rem" borderRadius="0.5rem" border="1px">
      <Text
        fontWeight="bold"
        fontSize="1.2rem"
        mb="1.5rem"
        colorScheme="brand.400"
      >
        {question}
      </Text>

      <VStack>
        {options?.map((item, i) => (
          <Button
            key={item._id}
            colorScheme="purple"
            pointerEvents={isAnswered.clickEvents ? "none" : "inherit"}
            onClick={() => checkAnswer(item.isCorrect, item._id)}
            bgGradient={
              isAnswered.clickedButtonId === item._id
                ? "linear(to-r, purple.300, purple.300)"
                : "linear(to-r, #6932ff, #a600ff)"
            }
            width="100%"
            p="1.5rem"
          >
            {item.text}
          </Button>
        ))}
      </VStack>
    </Container>
  );
}
