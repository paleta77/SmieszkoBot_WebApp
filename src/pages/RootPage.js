import React from "react";
import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles';
import LoginGrid from '../elements/LoginGrid';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
    },
}));

function RootPage({
                      login,
                      codeRequest,
                  }) {
    const classes = useStyles();
    return (
        <Container maxWidth="xs">

            <div className={classes.paper}>
                <LoginGrid
                    login={login}
                    codeRequest={codeRequest}
                />
            </div>
        </Container>
    )
}

export default RootPage;