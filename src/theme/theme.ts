import { createMuiTheme, Theme } from '@material-ui/core/styles';

const useMuiTheme: () => Theme = () => {
    return createMuiTheme({
        palette: {
            primary: {
                main: "#9012fe",
            },
            secondary: {
                main: "#b2aabf",
            },
        },
    });
}

export { useMuiTheme };
