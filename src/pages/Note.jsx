import { useEffect, useState } from "react";
import { Button, Container, FormControl, FormLabel, Input, Textarea, VStack } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

const Note = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== "new") {
      const fetchNote = async () => {
        const token = localStorage.getItem("token");
        try {
          const response = await fetch(`https://jjfebbwwtcxyhvnkuyrh.supabase.co/rest/v1/notes?id=eq.${id}`, {
            headers: {
              "Content-Type": "application/json",
              "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqZmViYnd3dGN4eWh2bmt1eXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NTgyMzMsImV4cCI6MjAzMjAzNDIzM30.46syqx3sHX-PQMribS6Vt0RLLUY7w295JHO61yZ-fec",
              "Authorization": `Bearer ${token}`
            }
          });

          const data = await response.json();
          if (data.length > 0) {
            setTitle(data[0].title);
            setContent(data[0].content);
          }
        } catch (error) {
          console.error("Error fetching note:", error);
        }
      };

      fetchNote();
    }
  }, [id]);

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    const method = id === "new" ? "POST" : "PATCH";
    const url = id === "new" ? "https://jjfebbwwtcxyhvnkuyrh.supabase.co/rest/v1/notes" : `https://jjfebbwwtcxyhvnkuyrh.supabase.co/rest/v1/notes?id=eq.${id}`;

    try {
      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqZmViYnd3dGN4eWh2bmt1eXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NTgyMzMsImV4cCI6MjAzMjAzNDIzM30.46syqx3sHX-PQMribS6Vt0RLLUY7w295JHO61yZ-fec",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, content })
      });

      navigate("/notes");
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  return (
    <Container centerContent>
      <VStack spacing={4} mt={10}>
        <FormControl id="title">
          <FormLabel>Title</FormLabel>
          <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl id="content">
          <FormLabel>Content</FormLabel>
          <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </FormControl>
        <Button onClick={handleSave} colorScheme="blue" width="full">Save</Button>
      </VStack>
    </Container>
  );
};

export default Note;