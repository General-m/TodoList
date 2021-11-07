import { makeStyles } from "@material-ui/core/styles";
import { motion } from "framer-motion";
import { useTodoItems } from "../../context/TodoItemsContext";
import { sortItems } from "../../utils/sortItems";
import { TodoItemCard } from "../TodoItemCard";

const spring = {
  type: "spring",
  damping: 25,
  stiffness: 120,
  duration: 0.25,
};

const useTodoItemListStyles = makeStyles({
  root: {
    listStyle: "none",
    padding: 0,
  },
});

export const TodoItemsList: React.FC = () => {
  const { todoItems } = useTodoItems();

  const classes = useTodoItemListStyles();
  const sortedItems = sortItems(todoItems.slice());

  return (
    <ul className={classes.root}>
      {sortedItems.map((item) => (
        <motion.li key={item.id} transition={spring} layout={true}>
          <TodoItemCard item={item} />
        </motion.li>
      ))}
    </ul>
  );
};
