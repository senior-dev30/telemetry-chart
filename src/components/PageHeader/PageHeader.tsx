import React, { ReactNode, FC } from 'react';
import { Box, Typography } from '@material-ui/core';
import { useStyles } from './styles';

export interface HeaderAction {
    title?: string;
    onClick?: () => void;
    icon?: ReactNode;
}

interface PageHeaderProps {
    eyebrow?: string | ReactNode;
    title: string | ReactNode;
    subtitle?: string | ReactNode;
    actions?: ReactNode[];
}

export const PageHeader: FC<PageHeaderProps> = props => {
    const classes = useStyles();
    return (
        <Box
            display="flex"
            mb={4}
            alignItems="flex-start"
            flexDirection="row-reverse"
            flexWrap="wrap"
        >
            {props.actions?.length ? (
                <Box display="flex" mb={2} alignItems="center">
                    {props.actions?.map((action, index) => (
                        <Box ml={2} key={index}>
                            {action}
                        </Box>
                    ))}
                </Box>
            ) : null}
            <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                flexGrow={1}
            >
                {props.eyebrow && (
                    <Box mb={1}>
                        <Typography variant="h2" className={classes.eyebrow}>
                            {props.eyebrow}
                        </Typography>
                    </Box>
                )}
                <Typography
                    variant="h1"
                    color="primary"
                    className={classes.title}
                >
                    {props.title}
                </Typography>
                {props.subtitle && (
                    <Box mt={1}>
                        <Typography variant="h3" className={classes.subtitle}>
                            {props.subtitle}
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};
