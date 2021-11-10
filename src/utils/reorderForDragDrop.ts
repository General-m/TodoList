import { TodoItem } from "../types";

export const reorder = (
    list: TodoItem[],
    startIndex: number,
    endIndex: number
): TodoItem[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};