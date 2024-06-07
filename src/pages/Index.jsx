import { useState } from "react";
import { Container, Text, VStack, Button, Input, Box, Image, HStack, IconButton, Badge, Stack, Divider } from "@chakra-ui/react";
import { FaShoppingCart, FaTrash, FaCreditCard } from "react-icons/fa";

const books = [
  { id: 1, title: "The Little Prince", author: "Antoine de Saint-Exupéry", price: 10, img: "https://images.unsplash.com/photo-1529158062015-cad636e205a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxUaGUlMjBMaXR0bGUlMjBQcmluY2UlMjBib29rJTIwY292ZXJ8ZW58MHx8fHwxNzE3NzUxNTk4fDA&ixlib=rb-4.0.3&q=80&w=1080" },
  { id: 2, title: "Where the Wild Things Are", author: "Maurice Sendak", price: 12, img: "https://images.unsplash.com/photo-1529158062015-cad636e205a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxXaGVyZSUyMHRoZSUyMFdpbGQlMjBUaGluZ3MlMjBBcmUlMjBib29rJTIwY292ZXJ8ZW58MHx8fHwxNzE3NzUxNTk4fDA&ixlib=rb-4.0.3&q=80&w=1080" },
  { id: 3, title: "Goodnight Moon", author: "Margaret Wise Brown", price: 8, img: "https://images.unsplash.com/photo-1529158062015-cad636e205a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxHb29kbmlnaHQlMjBNb29uJTIwYm9vayUyMGNvdmVyfGVufDB8fHx8MTcxNzc1MTU5OHww&ixlib=rb-4.0.3&q=80&w=1080" },
];

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username && password) {
      setIsLoggedIn(true);
    }
  };

  const addToCart = (book) => {
    setCart([...cart, book]);
  };

  const removeFromCart = (bookId) => {
    setCart(cart.filter((book) => book.id !== bookId));
  };

  const totalAmount = cart.reduce((acc, book) => acc + book.price, 0);

  if (!isLoggedIn) {
    return (
      <Container centerContent maxW="container.sm" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <VStack spacing={4}>
          <Text fontSize="2xl">Login to My First Book</Text>
          <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={handleLogin}>Login</Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg" py={4}>
      <HStack justifyContent="space-between" mb={4}>
        <Text fontSize="2xl">My First Book</Text>
        <IconButton aria-label="Cart" icon={<FaShoppingCart />} size="lg" />
      </HStack>
      <Divider mb={4} />
      <VStack spacing={4} align="stretch">
        {books.map((book) => (
          <HStack key={book.id} spacing={4} p={4} borderWidth="1px" borderRadius="lg">
            <Image boxSize="100px" src={book.img} alt={book.title} />
            <VStack align="start">
              <Text fontSize="lg">{book.title}</Text>
              <Text>by {book.author}</Text>
              <Text>${book.price}</Text>
              <Button onClick={() => addToCart(book)}>Add to Cart</Button>
            </VStack>
          </HStack>
        ))}
      </VStack>
      <Divider my={4} />
      <Text fontSize="2xl">Shopping Cart</Text>
      <VStack spacing={4} align="stretch">
        {cart.length === 0 ? (
          <Text>Your cart is empty</Text>
        ) : (
          cart.map((book) => (
            <HStack key={book.id} spacing={4} p={4} borderWidth="1px" borderRadius="lg">
              <Image boxSize="50px" src={book.img} alt={book.title} />
              <VStack align="start">
                <Text fontSize="lg">{book.title}</Text>
                <Text>${book.price}</Text>
              </VStack>
              <IconButton aria-label="Remove" icon={<FaTrash />} onClick={() => removeFromCart(book.id)} />
            </HStack>
          ))
        )}
      </VStack>
      {cart.length > 0 && (
        <>
          <Divider my={4} />
          <HStack justifyContent="space-between">
            <Text fontSize="xl">Total: ${totalAmount}</Text>
            <Button leftIcon={<FaCreditCard />} colorScheme="teal">
              Proceed to Payment
            </Button>
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Index;
