export interface TodoItem {
    id: string;
    title: string;
    details?: string;
    done: boolean;
  }
  
 export interface TodoItemsState {
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
  