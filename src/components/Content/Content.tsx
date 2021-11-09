import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { TodoItemsList } from "../TodoItemsList";
import { TodoItemForm } from "../TodoItemForm";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export const Content: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <header>
        <Typography variant="h2" component="h1">
          Todo List
        </Typography>
      </header>
      <main>
        <TodoItemForm />

        <TodoItemsList />
      </main>
    </Container>
  );
};
