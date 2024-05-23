import { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch("https://jjfebbwwtcxyhvnkuyrh.supabase.co/auth/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqZmViYnd3dGN4eWh2bmt1eXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NTgyMzMsImV4cCI6MjAzMjAzNDIzM30.46syqx3sHX-PQMribS6Vt0RLLUY7w295JHO61yZ-fec"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (data.user) {
        navigate("/login");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Container centerContent>
      <VStack spacing={4} mt={10}>
        <Text fontSize="2xl">Register</Text>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Button onClick={handleRegister} colorScheme="blue" width="full">Register</Button>
        <Box>
          <Text>
            Already have an account? <Link to="/login" style={{ color: "blue" }}>Login</Link>
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default Register;