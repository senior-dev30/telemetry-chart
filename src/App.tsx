import React from 'react';
import TelemtryReport from './TelemtryReport';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import theme from './config/theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <TelemtryReport />
        </ThemeProvider>
    );
}

export default App;
