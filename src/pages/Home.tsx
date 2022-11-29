import { Box, Spinner } from "@chakra-ui/react";
import { QuizList } from "../components/index";
import { useQuiz } from "../context/playQuiz-context";

export function Home(): JSX.Element {
  const { loader } = useQuiz();

  return (
    <>
      {loader ? (
        <Box
          height="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner size="lg" />
        </Box>
      ) : (
        <QuizList />
      )}
    </>
  );
}
