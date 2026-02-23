import {
  Box,
  Button,
  Dialog,
  Heading,
  HStack,
  Image,
  Input,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useColorModeValue } from "./color-mode";
import { useProductStore } from "@/store/product";
import { useState } from "react";

export default function ProductCard({
  product,
}: {
  name: string;
  price: number;
  image: string;
}) {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { deleteProduct, updateProduct } = useProductStore();

  const [updatedProduct, setUpdatedProduct] = useState(product);

  async function handleDeleteProduct(productId: string) {
    const { success, message } = await deleteProduct(productId);

    if (success) {
      toaster.create({
        description: message,
        type: "success",
        closable: true,
      });
    } else {
      toaster.create({
        description: message,
        type: "error",
        closable: true,
      });
    }
  }

  async function handleUpdateProduct(productId, updatedProduct) {
    const { success, message } = await updateProduct(productId, updatedProduct);

    if (success) {
      toaster.create({
        description: message,
        type: "success",
        closable: true,
      });
    } else {
      toaster.create({
        description: message,
        type: "error",
        closable: true,
      });
    }
  }

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      backgroundColor={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit={"cover"}
      />
      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
          $ {product.price}
        </Text>
        <HStack gap={2}>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button colorPalette={"cyan"}>
                <FiEdit />
              </Button>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Update Product</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <VStack>
                      <Input
                        placeholder="Product Name"
                        name="name"
                        value={updatedProduct.name}
                        onChange={(e) => {
                          setUpdatedProduct({
                            ...updatedProduct,
                            name: e.target.value,
                          });
                        }}
                      />
                      <Input
                        placeholder="Price"
                        name="price"
                        type="number"
                        value={updatedProduct.price}
                        onChange={(e) => {
                          setUpdatedProduct({
                            ...updatedProduct,
                            price: e.target.value,
                          });
                        }}
                      />
                      <Input
                        placeholder="Image URL"
                        name="image"
                        value={updatedProduct.image}
                        onChange={(e) =>
                          setUpdatedProduct({
                            ...updatedProduct,
                            image: e.target.value,
                          })
                        }
                      />
                    </VStack>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => setUpdatedProduct({ ...product })}
                      >
                        Cancel
                      </Button>
                    </Dialog.ActionTrigger>
                    <Dialog.ActionTrigger asChild>
                      <Button
                        onClick={() =>
                          handleUpdateProduct(product._id, updatedProduct)
                        }
                      >
                        Update
                      </Button>
                    </Dialog.ActionTrigger>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
          <Button
            colorPalette={"red"}
            onClick={() => handleDeleteProduct(product._id)}
          >
            <RiDeleteBinLine />
          </Button>
        </HStack>
      </Box>
      <Toaster />
    </Box>
  );
}
