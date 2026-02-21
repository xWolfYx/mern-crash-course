import { useColorModeValue } from "@/components/ui/color-mode";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

export default function CreatePage() {
  const [{ name, price, image }, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewProduct((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleAddProduct() {
    console.log({ name, price, image });
  }

  return (
    <Container width={"clamp(300px, 100%, 800px)"}>
      <VStack gap={8}>
        <Heading as="h1" size={"2xl"} textAlign={"center"} mb={8}>
          Create new product
        </Heading>
        <Box
          width={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack gap={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={name}
              onChange={(e) => handleChange(e)}
            />
            <Input
              placeholder="Product Price"
              name="price"
              value={price}
              onChange={(e) => handleChange(e)}
            />
            <Input
              placeholder="Product Image"
              name="image"
              value={image}
              onChange={(e) => handleChange(e)}
            />
            <Button colorPalette={"cyan"} onClick={handleAddProduct} w={"full"}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
