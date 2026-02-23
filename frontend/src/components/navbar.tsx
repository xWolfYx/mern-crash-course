import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { BsPlusSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useColorMode } from "./ui/color-mode";
import { FaRegMoon, FaRegSun } from "react-icons/fa";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          fontSize={{ base: 22, sm: 28 }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient="to-r"
          gradientFrom="cyan.400"
          gradientTo="blue.500"
          bgClip={"text"}
        >
          <Link to="/">Product Store</Link>
        </Text>
        <HStack gap={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button variant={"subtle"}>
              <BsPlusSquare />
            </Button>
          </Link>
          <Button variant={"subtle"} onClick={toggleColorMode}>
            {colorMode === "light" ? <FaRegSun /> : <FaRegMoon />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
}
