import { useCallback } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteIcon from "@material-ui/icons/Delete";
import classnames from "classnames";
import { useTodoItems } from "../../context/TodoItemsContext";
import { TodoItem, TodoItemsActionTypes } from "../../types";
import { useStyles } from "./TodoItemCard.styles";

export const TodoItemCard = ({ item }: { item: TodoItem }) => {
  const classes = useStyles();
  const { dispatch } = useTodoItems();

  const handleDelete = useCallback(
    () =>
      dispatch({ type: TodoItemsActionTypes.DELETE, data: { id: item.id } }),
    [item.id, dispatch]
  );

  const handleToggleDone = useCallback(
    () =>
      dispatch({
        type: TodoItemsActionTypes.TOGGLE_DONE,
        data: { id: item.id },
      }),
    [item.id, dispatch]
  );

  return (
    <Card
      className={classnames(classes.root, {
        [classes.doneRoot]: item.done,
      })}
    >
      <CardHeader
        action={
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        }
        title={
          <FormControlLabel
            control={
              <Checkbox
                checked={item.done}
                onChange={handleToggleDone}
                name={`checked-${item.id}`}
                color="primary"
              />
            }
            label={item.title}
          />
        }
      />
      {item.details ? (
        <CardContent>
          <Typography variant="body2" component="p">
            {item.details}
          </Typography>
        </CardContent>
      ) : null}
    </Card>
  );
};
