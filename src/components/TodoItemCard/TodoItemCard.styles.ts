import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            wordBreak: "break-all",
        },
        doneRoot: {
            textDecoration: "line-through",
            color: "#888888",
        },
    }),
);
