"use client";
import { FavoriteBorder } from "@mui/icons-material";
import { Avatar, Container, IconButton, Typography } from "@mui/material";

export default function About() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h1" gutterBottom>
        h1. Heading
      </Typography>
      <Avatar src="/broken-image.jpg" />
      <Typography variant="body2" gutterBottom>
        userName
      </Typography>
      <Typography variant="body2" gutterBottom>
        2025年04月08日
      </Typography>
      <IconButton aria-label="add to favorites">
        <FavoriteBorder />
      </IconButton>
      <Typography variant="body1" gutterBottom>
        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      <Typography variant="body1" gutterBottom>
        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
    </Container>
  );
}
