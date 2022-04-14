import { PaletteOptions } from '@material-ui/core/styles/createPalette';

export interface Color {
    primary: {
        [key: string]: string;
    };
    secondary: {
        [key: string]: string;
    };
}

export const colors: Color = {
    primary: {
        mainBlue: '#2047b0',
        darkBlue: '#23263C',
        lightBlue: '#4263bc',
        paleBlue: '#E9F4FD',
        darkGrey: '#595959',
        mediumGrey: '#919191',
        lightGrey: '#D8D8D8',
        white: '#ffffff',
    },
    secondary: {
        mainBlue: '#82cded',
        darkBlue: '#1976d2',
        lightBlue: '#a2d4ee',
    },
};

export const palette: PaletteOptions = {
    primary: {
        light: colors.primary.lightBlue,
        main: colors.primary.mainBlue,
        dark: colors.primary.darkBlue,
    },
    secondary: {
        main: colors.secondary.mainBlue,
        light: colors.secondary.lightBlue,
        dark: colors.secondary.darkBlue,
    },
};
