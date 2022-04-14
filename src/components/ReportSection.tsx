import React, { FC } from 'react';
import { Box, Typography } from '@material-ui/core';

type Props = {
    no?: string;
    title: string;
    children?: React.ReactNode;
    id: string;
};

const ReportSection: FC<Props> = ({ no, title, children, id }) => {
    return (
        <Box display="flex" flexDirection="column" pt={3} mb={3} id={id}>
            <Box>
                <Typography variant="h2" color="primary">
                    {no ? <span style={{ marginRight: 24 }}>{no}</span> : null}
                    {title}
                </Typography>
            </Box>
            <Box mt={1} px={3}>
                {children}
            </Box>
        </Box>
    );
};

export default ReportSection;
