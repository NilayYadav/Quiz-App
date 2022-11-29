import { Grid, GridItem, Box } from "@chakra-ui/react";
import { UsersScores } from "../pages/private/Leaderboard";


export function LeaderBoardTable({ sortedScores }: { sortedScores: UsersScores[] }){
    return(
        <Grid
            w="100%"
            h="fit-content"
            templateColumns="repeat(1, 1fr)"
        >
            <GridItem 
                w="100%" 
                display="flex" 
                alignItems="center" 
                justifyContent="space-around"
                color="#a0aec0"
                borderBottom="solid 1px #2d3748"
                py="0.6rem"
                fontSize="0.8rem" 
                fontWeight="bold"
                textAlign="center"
            >
                <Box w="20%"> RANK </Box>
                <Box w="30%"> PLAYER </Box>
                <Box w="25%"> ASTRNOMY	</Box>
                <Box w="25%"> SCIENCE </Box>
                <Box w="25%"> FRIENDS </Box>
            </GridItem>

            {
                sortedScores.map((user:UsersScores, index:number) => {
                    return (
                        <GridItem 
                            key={user._id}
                            w="100%" 
                            display="flex" 
                            alignItems="center" 
                            justifyContent="space-around"
                            borderBottom="solid 1px #2d3748"
                            py="0.6rem"
                            fontSize="1rem" 
                            textAlign="center"
                        >
                            <Box w="20%"> { index+1 } </Box>
                            <Box w="30%"> { user.name } </Box>
                            <Box w="25%"> { user.score.astronomy }	</Box>
                            <Box w="25%"> { user.score.science } </Box>
                            <Box w="25%"> { user.score.friends } </Box>
                        </GridItem>
                      
                    )
                })
            }
        </Grid>
    )
}