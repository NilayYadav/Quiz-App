import { Box, VStack, Text, Button, Flex, Image, Spacer, Heading, useMediaQuery } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { useQuiz } from "../context/playQuiz-context";


export function QuizList(){
    const { login, setToggle } = useAuth();
    const { state, dispatch } = useQuiz();
    const { quizData:{ quiz } } = state;
    const [ isLargerThan580 ] = useMediaQuery("(min-width: 580px)");
    const navigate = useNavigate();

    return(
        <VStack my={"5rem"}>
        <Heading my="1rem" size="2xl" textAlign="center">Welcome to Quizzard</Heading>
        {
            quiz?.map(({_id, name, image}) => {
                return (
                    <Flex key={ _id }
                        boxShadow="xl"
                        border="1px" 
                        w={ isLargerThan580 ? "50%" : "90%" } 
                        h={ isLargerThan580 ? "13rem" : "10rem" } 
                        style={{ marginTop: "1rem" }}
                    >
                        <Box mt={ isLargerThan580 ? "2rem" : "1rem" } mx="0.5rem" w="50%">
                            <Text 
                                ml={isLargerThan580 ? "1rem" : "0.5rem"}
                                fontSize={isLargerThan580 ? "4xl" : "2xl"}
                                fontWeight="bold"
                            >
                                { name }
                            </Text>
                            <Button 
                                ml={isLargerThan580 ? "1.5rem" : "0.5rem"}
                                mt="1rem"
                                px={isLargerThan580 ? "2rem" : "1rem"}
                                colorScheme="purple"
                                bgGradient="linear(to-r, #6932ff, #a600ff)"
                                variant="solid"
                                onClick={login ? () => {
                                    navigate(`/quiz/${_id}`)
                                    dispatch({ type: "QUIZ_NAME", payload: name})
                                    dispatch({ type: "CLEAR_SCORE" })
                                    dispatch({ type: "CLEAR_STATUS" })
                                } : () => setToggle(true)}
                            >
                                Play Quiz
                            </Button>
                        </Box>
                        <Spacer/>
                        <Box w="50%" h="100%">
                            <Image 
                                w="100%" 
                                h="100%" 
                                src={image} alt={name} 
                            />
                        </Box>
                    </Flex>
                )
            })
        }
    </VStack>
    )
}