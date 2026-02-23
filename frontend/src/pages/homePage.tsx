import ProductCard from "@/components/ui/productCard";
import { useProductStore } from "@/store/product";
import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container width={"clamp(300px, 100%, 800px)"}>
      <VStack gap={8}>
        <Text
          fontSize={30}
          fontWeight={"bold"}
          bgGradient="to-r"
          gradientFrom="cyan.400"
          gradientTo="blue.500"
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products
        </Text>
        {products.length === 0 ? (
          <Text>
            No products found{" "}
            <Link to={"/create"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline", cursor: "pointer" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={10} w={"full"}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
}
