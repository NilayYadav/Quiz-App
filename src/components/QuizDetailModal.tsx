import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

export function QuizDetail({
  isOpen,
  onOpen,
  onClose,
  totalQuestion,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  totalQuestion: number | undefined;
}) {
  return (
    <>
      <Modal colorScheme="purple" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Rules</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UnorderedList>
                <ListItem> There are total {totalQuestion} questions. </ListItem>
                <ListItem> All questions are compulsory. </ListItem>
                <ListItem> Each questions contains 5 points. </ListItem>
                <ListItem> No negative points for incorrect answer. </ListItem>
                <ListItem> Answer a question and get next question. </ListItem>
            </UnorderedList>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Start Quiz</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
