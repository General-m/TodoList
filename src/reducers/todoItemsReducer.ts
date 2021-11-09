import { TodoItemsAction, TodoItemsState } from "../types";
import { generateIdItem } from "../utils/generateIdItem";

export const todoItemsReducer = (state: TodoItemsState, action: TodoItemsAction) => {
  switch (action.type) {
    case "LOAD_STATE": {
      return action.data;
    }
    case "ADD":
      return {
        ...state,
        todoItems: [
          { id: generateIdItem(), done: false, ...action.data.todoItem },
          ...state.todoItems,
        ],
      };

    case "DELETE":
      return {
        ...state,
        todoItems: state.todoItems.filter(({ id }) => id !== action.data.id),
      };

    case "TOGGLE_DONE":
      const itemIndex = state.todoItems.findIndex(
        ({ id }) => id === action.data.id
      );
      const item = state.todoItems[itemIndex];

      return {
        ...state,
        todoItems: [
          ...state.todoItems.slice(0, itemIndex),
          { ...item, done: !item.done },
          ...state.todoItems.slice(itemIndex + 1),
        ],
      };

    case "SORT":
      return action.data;
    default:
      throw new Error();
  }
}