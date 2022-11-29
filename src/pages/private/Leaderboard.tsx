import { Container, Spinner, Box } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { LeaderBoardTable } from "../../components";

export type UsersScores = {
  _id: string;
  name: string;
  score: {
    astronomy: number;
    friends: number;
    science: number;
  };
};

export function Leaderboard(): JSX.Element {
  const [userScores, setScores] = useState([] as UsersScores[]);
  const [spinner, setSpinner] = useState(false);
  const sortedScores = getSortedScores();

  function getSortedScores(): UsersScores[] {
    return userScores
      .sort(
        (a, b) =>
          (b.score.astronomy + b.score.science + b.score.friends) 
            -
          (a.score.astronomy + a.score.science + a.score.friends)
      )
      .slice(0, 10);
  }

  useEffect(() => {
    (async () => {
      setSpinner(true);
      try {
        const api = "https://quizapp.sauravkumar007.repl.co/scores/allscores";
        const response = await axios.get(api);
        setSpinner(false);
        setScores(response.data.allScores);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      {spinner ? (
        <Box
          height="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner size="lg" />
        </Box>
      ) : (
        <>
          <Container
            w="95%"
            maxW="container.md"
            px="-0.5"
            mt="8rem"
            borderLeft="solid 1px rgb(45, 55, 72)"
            borderRight="solid 1px rgb(45, 55, 72)"
            borderTop="solid 1px rgb(45, 55, 72)"
          >
            <LeaderBoardTable 
              sortedScores={sortedScores} 
            />
          </Container>
        </>
      )}
    </>
  );
}
