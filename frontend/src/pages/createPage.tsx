import { useColorModeValue } from "@/components/ui/color-mode";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useProductStore } from "@/store/product";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

type NewProductForm = {
  name: string;
  price: number;
  image: string;
};

export default function CreatePage() {
  const [{ name, price, image }, setNewProduct] = useState<NewProductForm>({
    name: "",
    price: 0,
    image: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewProduct((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const { createProduct } = useProductStore();

  async function handleAddProduct() {
    const { success, message } = await createProduct({ name, price, image });
    console.log(success, message);

    if (success) {
      toaster.create({
        description: message,
        type: "success",
        closable: true,
      });
      setNewProduct({ name: "", price: 0, image: "" });
    } else {
      toaster.create({
        description: message,
        type: "error",
        closable: true,
      });
    }
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
      <Toaster />
    </Container>
  );
}
