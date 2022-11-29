import { Box, Text } from "@chakra-ui/react";
import { GoogleLogin } from "react-google-login";
import { useAuth } from "../context/auth.context";

export function LogInCard() {
  const { setToggle, loginUserwithGmail } = useAuth();

  const responseGoogle = (response: any) => {
    if(response.tokenId){
      setToggle(false);
      return loginUserwithGmail(response.tokenId);
    }
  };

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
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDir="column"
        position="fixed"
        top="4rem"
        right="0.5rem"
        zIndex="2"
        border="solid 0.5px #adadad"
        shadow="lg"
        borderRadius="0.3rem"
        bg="#edeeee"
        w="max-content"
        px="1rem"
        py="0.4rem"
      >
        <Text mt="0.5rem" color="gray.700" fontWeight="bold">
          Please Login To Play Quiz
        </Text>
        <Box my="0.5rem">
          <GoogleLogin
            clientId="692781005838-hlal13cs4ooruifgj36thlk30k30it0k.apps.googleusercontent.com"
            buttonText="LogIn with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </Box>
      </Box>
    </Box>
  );
}
