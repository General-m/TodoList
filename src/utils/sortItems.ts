import { TodoItem } from "../types";

export const sortItems =(items:  TodoItem[])=>{

 return items.sort((a, b) => {
    if (a.done && !b.done) {
      return 1;
    }

    if (!a.done && b.done) {
      return -1;
    }

    return 0;
  });
} 
