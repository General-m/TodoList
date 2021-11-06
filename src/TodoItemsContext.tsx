import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";

export interface TodoItem {
  id: string;
  title: string;
  details?: string;
  done: boolean;
}

interface TodoItemsState {
  todoItems: TodoItem[];
}

export type TodoItemData = Omit<TodoItem, "id" | "done">;

export enum TodoItemsActionTypes {
  LOAD_STATE = "LOAD_STATE",
  ADD = "ADD",
  DELETE = "DELETE",
  TOGGLE_DONE = "TOGGLE_DONE",
}

interface TodoItemsLoadAction {
  type: TodoItemsActionTypes.LOAD_STATE;
  data: TodoItemsState;
}
interface TodoItemsAddAction {
  type: TodoItemsActionTypes.ADD;
  data: { todoItem: TodoItemData };
}
interface TodoItemsDeleteAction {
  type: TodoItemsActionTypes.DELETE;
  data: { id: string };
}

interface TodoItemsToggleDoneAction {
  type: TodoItemsActionTypes.TOGGLE_DONE;
  data: { id: string };
}

export type TodoItemsAction =
  | TodoItemsLoadAction
  | TodoItemsAddAction
  | TodoItemsDeleteAction
  | TodoItemsToggleDoneAction;

const TodoItemsContext = createContext<
  (TodoItemsState & { dispatch: (action: TodoItemsAction) => void }) | null
>(null);

const defaultState = { todoItems: [] };
const localStorageKey = "todoListState";

export const TodoItemsContextProvider = ({
  children,
}: {
  children?: ReactNode;
}) => {
  const [state, dispatch] = useReducer(todoItemsReducer, defaultState);

  useEffect(() => {
    const savedState = localStorage.getItem(localStorageKey);

    if (savedState) {
      try {
        dispatch({
          type: TodoItemsActionTypes.LOAD_STATE,
          data: JSON.parse(savedState),
        });
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }, [state]);

  return (
    <TodoItemsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TodoItemsContext.Provider>
  );
};

export const useTodoItems = () => {
  const todoItemsContext = useContext(TodoItemsContext);

  if (!todoItemsContext) {
    throw new Error(
      "useTodoItems hook should only be used inside TodoItemsContextProvider"
    );
  }

  return todoItemsContext;
};

function todoItemsReducer(state: TodoItemsState, action: TodoItemsAction) {
  switch (action.type) {
    case "LOAD_STATE": {
      return action.data;
    }
    case "ADD":
      return {
        ...state,
        todoItems: [
          { id: generateId(), done: false, ...action.data.todoItem },
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
    default:
      throw new Error();
  }
}

function generateId() {
  return `${Date.now().toString(36)}-${Math.floor(
    Math.random() * 1e16
  ).toString(36)}`;
}
