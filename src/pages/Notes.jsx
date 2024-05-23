import { useEffect, useState } from "react";
import { Box, Button, Container, Flex, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("https://jjfebbwwtcxyhvnkuyrh.supabase.co/rest/v1/notes", {
          headers: {
            "Content-Type": "application/json",
            "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqZmViYnd3dGN4eWh2bmt1eXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NTgyMzMsImV4cCI6MjAzMjAzNDIzM30.46syqx3sHX-PQMribS6Vt0RLLUY7w295JHO61yZ-fec",
            "Authorization": `Bearer ${token}`
          }
        });

        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, [navigate]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`https://jjfebbwwtcxyhvnkuyrh.supabase.co/rest/v1/notes?id=eq.${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqZmViYnd3dGN4eWh2bmt1eXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NTgyMzMsImV4cCI6MjAzMjAzNDIzM30.46syqx3sHX-PQMribS6Vt0RLLUY7w295JHO61yZ-fec",
          "Authorization": `Bearer ${token}`
        }
      });

      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <Container centerContent>
      <VStack spacing={4} mt={10}>
        <Text fontSize="2xl">Your Notes</Text>
        <Button onClick={() => navigate("/note/new")} colorScheme="blue">Create New Note</Button>
        {notes.map(note => (
          <Box key={note.id} p={4} borderWidth="1px" borderRadius="lg" w="100%">
            <Flex justify="space-between" align="center">
              <Text fontSize="xl">{note.title}</Text>
              <Box>
                <Button size="sm" onClick={() => navigate(`/note/${note.id}`)}>Edit</Button>
                <Button size="sm" colorScheme="red" ml={2} onClick={() => handleDelete(note.id)}>Delete</Button>
              </Box>
            </Flex>
            <Text mt={2}>{note.content}</Text>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Notes;