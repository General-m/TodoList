import { makeStyles } from "@material-ui/core/styles";
import { motion } from "framer-motion";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useTodoItems } from "../../context/TodoItemsContext";
import { sortItems } from "../../utils/sortItems";
import { TodoItemCard } from "../TodoItemCard";
import { TodoItem, TodoItemsActionTypes } from "../../types";
import { spring } from "../../constants/springMotion";

const useTodoItemListStyles = makeStyles({
  root: {
    listStyle: "none",
    padding: 0,
  },
});

const reorder = (
  list: TodoItem[],
  startIndex: number,
  endIndex: number
): TodoItem[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "white" : "white",
  ...draggableStyle,
});

export const TodoItemsList: React.FC = () => {
  const { dispatch } = useTodoItems();
  const { todoItems } = useTodoItems();

  const classes = useTodoItemListStyles();
  const sortedItems = sortItems(todoItems.slice());

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      sortedItems,
      result.source.index,
      result.destination.index
    );

    dispatch({
      type: TodoItemsActionTypes.SORT,
      data: { todoItems: items },
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <ul
            className={classes.root}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {sortedItems.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <motion.li key={item.id} transition={spring} layout={true}>
                      <TodoItemCard item={item} />
                    </motion.li>
                  </div>
                )}
              </Draggable>
            ))}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};
