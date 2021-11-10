import { useTodoItems } from "../../context";
import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { TodoItemData, TodoItemsActionTypes } from "../../types";
import { useStyles } from "./TodoItemForm.styles";

export const TodoItemForm: React.FC = () => {
  const classes = useStyles();
  const { dispatch } = useTodoItems();
  const { control, handleSubmit, reset, watch } = useForm();

  return (
    <form
      onSubmit={handleSubmit((formData: TodoItemData) => {
        dispatch({
          type: TodoItemsActionTypes.ADD,
          data: { todoItem: formData },
        });
        reset({ title: "", details: "" });
      })}
    >
      <Controller
        name="title"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            {...field}
            label="TODO"
            fullWidth={true}
            className={classes.root}
          />
        )}
      />
      <Controller
        name="details"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Details"
            fullWidth={true}
            multiline={true}
            className={classes.root}
          />
        )}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={!watch("title")}
      >
        Add
      </Button>
    </form>
  );
};
