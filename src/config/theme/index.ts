
import { createTheme } from '@material-ui/core/styles';
import { Theme, ThemeOptions } from '@material-ui/core/styles/createTheme';
import { Color, colors, palette } from './palette';

export type ThemeInterface = Theme & {
    colors: Color;
};

const theme: ThemeOptions & {
    colors: Color;
} = {
    colors,
    palette,
    overrides: {
        MuiCssBaseline: {
            '@global': {
                body: {
                    margin: 0,
                    fontFamily:
                        "'Exo', 'Roboto', 'Helvetica', 'Arial', sans-serif",
                    '-webkit-font-smoothing': 'antialiased',
                    '-moz-osx-font-smoothing': 'grayscale',
                    overflow: 'hidden',
                    '& .MuiTooltip-tooltip': {
                        fontSize: 12,
                    },
                    '& #full-width-tooltip': {
                        '& .MuiTooltip-tooltip': {
                            maxWidth: 'none',
                        },
                    },
                    '@media (max-width: 767px)': {
                        overflowY: 'scroll',
                    },
                },
                iframe: {
                    display: 'none !important',
                    zIndex: 0,
                },
                '& body *': {
                    fontFamily:
                        "'Exo', 'Roboto', 'Helvetica', 'Arial', sans-serif",
                },
                code: {
                    fontFamily:
                        "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
                },
                'button, a, input': {
                    outline: 'none',
                    '&:focus, &:hover': {
                        outline: 'none',
                    },
                },
                '.hidden-arrow': {
                    '& input::-webkit-inner-spin-button': {
                        '-webkit-appearance': 'none',
                        margin: 0,
                    },
                    '& input[type=number]': {
                        '-moz-appearance': 'textfield',
                    },
                    '& input': {
                        textAlign: 'right',
                    },
                },
            },
        },
    },
};

export default createTheme(theme);
