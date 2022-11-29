import { Box, Text, Button, Table, Tr, Tbody, Td, Spinner } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth.context";
import axios from "axios";

export type UserInfo = {
  email: string;
  name: string;
  picture: string;
  score: {
    friends: number;
    science: number;
    astronomy: number;
  };
};

export function ProfileCard(): JSX.Element {
  const [user, setUser] = useState({} as UserInfo);
  const [loader, setLoader] = useState(false);
  const { token, setToggle, logout } = useAuth();

  useEffect(() => {
    (async () => {
      if (token) {
        setLoader(true);
        try {
          const api = "https://QuizApp.sauravkumar007.repl.co/users";
          const response = await axios.get(api, {
            headers: { authorization: token },
          });
          setLoader(false);
          setUser(response.data.user);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [token]);

  return (
    <Box>
      <Box
        w="100%"
        h="100%"
        position="fixed"
        top="0"
        zIndex="1"
        bg="transparent"
        onClick={() => setToggle(false)}
      ></Box>
      <Box
        position="fixed"
        top="4rem"
        right="0.5rem"
        zIndex="2"
        border="solid 0.5px #adadad"
        shadow="lg"
        borderRadius="0.3rem"
        bg="white"
        w="max-content"
        p="1rem"
        color="gray.700"
        fontWeight="bold"
        textAlign="center"
      >
        {loader ? (
          <Box
            w="13.3rem"
            h="21rem"
            fontSize="2rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Spinner  size="md" color="purple.600" />
          </Box>
        ) : (
          <>
            <Text fontSize="larger">{user?.name}</Text>
            <Text fontSize="small">{user?.email}</Text>
            <Box
              border="solid 1px #000"
              borderBottom="none"
              my="0.5rem"
              color="purple.700"
            >
              <Text
                textAlign="center"
                borderBottom="solid 1px #000"
                py="0.5rem"
              >
                {" "}
                Score{" "}
              </Text>

              <Table>
                <Tbody>
                  <Tr>
                    <Td borderColor="black">Astronomy</Td>
                    <Td borderColor="black" isNumeric>
                      {user?.score?.astronomy}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td borderColor="black">Science</Td>
                    <Td borderColor="black" isNumeric>
                      {user?.score?.science}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td borderColor="black">Friends</Td>
                    <Td borderColor="black" isNumeric>
                      {user?.score?.friends}
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>

            <Link to="/leaderboard" 
                style={{
                  color: "#6932ff", 
                  fontSize: "0.9rem", 
                  textDecoration: "underline",
                }}
                onClick={() => setToggle(false)}
              >
                check leaderboard
            </Link>

            <Button
              mt="0.5rem"
              w="100%"
              color="white"
              bgGradient="linear(to-r, #6932ff, #a600ff)"
              colorScheme="purple"
              variant="solid"
              onClick={() => {
                setToggle(false);
                logout();
              }}
            >
              Logout
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}
