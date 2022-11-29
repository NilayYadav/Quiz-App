import {
  Flex,
  Box,
  Spacer,
  useColorMode,
  Heading,
  HStack,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaMoon, FaSun, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { LogInCard, ProfileCard } from "./index";
import axios from "axios";


export function Navbar(): JSX.Element {
  const [userImage, setImage] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();
  const { login, token, toggleCard, setToggle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (token) {
        try {
          const api = "https://QuizApp.sauravkumar007.repl.co/users";
          const response = await axios.get(api, {
            headers: { authorization: token },
          });
          setImage(response.data.user.picture);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [token]);

  return (
    <div style={{ position: "relative" }}>
      <Flex
        pos="fixed"
        top="0"
        zIndex={2}
        w="100%"
        bgColor="blue.700"
        color="white"
      >
        <Box p="2.5" ml="2">
          <Heading size="lg" cursor="pointer" onClick={() => navigate("/")}>
            Quizzard
          </Heading>
        </Box>
        <Spacer />
        <HStack m="2">
          <Box fontSize="1.4rem" mr="6" onClick={toggleColorMode}>
            {colorMode === "light" ? <FaMoon /> : <FaSun />}
          </Box>
          <Box
            fontSize="1.3rem"
            pr="4"
            onClick={
              !toggleCard ? () => setToggle(true) : () => setToggle(false)
            }
          >
            {login ? (
              <Box
                border="solid 1px white"
                boxSize="1.9rem"
                borderRadius="50%"
                bg="white"
              >
                <Image borderRadius="full" src={userImage} alt="" />
              </Box>
            ) : (
              <FaUser />
            )}
          </Box>
        </HStack>
      </Flex>

      {toggleCard ? login ? <ProfileCard /> : <LogInCard /> : null}
    </div>
  );
}
