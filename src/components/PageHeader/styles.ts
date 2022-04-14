import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
    eyebrow: {
        fontSize: '14px',
        color: theme.palette.primary.main,
        fontWeight: 600,
    },

    title: {
        fontSize: '28px',
        color: theme.palette.primary.main,
        fontWeight: 800,
    },

    subtitle: {
        fontSize: '16px',
        color: theme.palette.grey[600],
    },
}));
