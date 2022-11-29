import { useEffect } from "react";
import { VStack, Text, Box, Button } from "@chakra-ui/react";
import { useAuth } from "../../context/auth.context";
import { useQuiz } from "../../context/playQuiz-context";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export function Scores() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { state } = useQuiz();
  const { quizStatus, quizName, score } = state;
  const totalScore = quizStatus
    .map((item) => item.questionAsked.points)
    .reduce((accum, current) => accum + current, 0);
  const checkAnswers = quizStatus.map(
    (item) =>
      item.playerAnswer ===
      item.questionAsked.options?.find((option) => option.isCorrect)?._id
  );
  const correctAnswers = checkAnswers.filter((item) => item === true);


  useEffect(() => {
    (async () => {
      if (token) {
        try {
          const api = "https://QuizApp.sauravkumar007.repl.co/scores";
          await axios.post(
            api,
            { [quizName]: score },
            { headers: { authorization: token } }
          );
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [token, quizName, score]);

  return (
    <>
      <VStack mt="5rem">
        <Box
          w="12rem"
          h="12rem"
          color="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="50%"
          bgGradient="linear(to-r, #a600ff, #6932ff)"
        >
          <Text
            fontSize="xxx-large"
            colorScheme="purple"
            fontWeight="extrabold"
          >
            {score} / {totalScore}
          </Text>
        </Box>
        <Box fontSize="1.2rem" fontWeight="bold" textAlign="center" py="1rem">
          <Text color="#09f62e">
            {" "}
            Correct Answers - {correctAnswers.length}{" "}
          </Text>
          <Text color="red">
            {" "}
            Incorrect Answers - {checkAnswers.length - correctAnswers.length}
          </Text>
        </Box>
        <Button 
          colorScheme="purple" 
          variant="outline" 
          onClick={() => navigate('/')}
        >
          Back To Quiz
        </Button>
        <Box>
          {quizStatus.map(({ playerAnswer, questionAsked }) => {
            return (
              <Box
                key={playerAnswer}
                bg="blue.700"
                color="white"
                fontSize="1.1rem"
                fontWeight="bold"
                borderRadius="0.5rem"
                p="1rem"
                m="1.2rem"
              >
                <Text>{questionAsked.question}</Text>
                {questionAsked.options?.map((item) => {
                  let bgColor = "";
                  const playerWrongAnswer =
                    item._id === playerAnswer && !item.isCorrect ? true : false;

                  if (item.isCorrect) {
                    bgColor = "linear(to-r, #07c525, #09f62e)";
                  } else if (playerWrongAnswer) {
                    bgColor = "linear(to-r, #f2200d, #f00f1e)";
                  } else {
                    bgColor = "linear(to-r, #a600ff, #6932ff)";
                  }
                  return (
                    <Box
                      key={item._id}
                      bgGradient={bgColor}
                      py="0.5rem"
                      px="1rem"
                      my="0.5rem"
                      borderRadius="0.5rem"
                    >
                      {item.text}
                    </Box>
                  );
                })}
              </Box>
            );
          })}
        </Box>
      </VStack>
    </>
  );
}
