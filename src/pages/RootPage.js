import React from "react";
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputIcon from '@material-ui/icons/Input';
import SendIcon from '@material-ui/icons/Send';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({

});

function RootPage({
                      login: login,
                      codeRequest: codeRequest,
                  }) {
    const classes = useStyles();
    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
        >
            <Grid>
                <TextField
                    id="username"
                    variant="outlined"
                    label="Nazwa użytkownika"
                    defaultValue="paleta77#3712"
                    fullWidth/>
            </Grid>
            <Grid item>
                <TextField
                    id="password"
                    variant="outlined"
                    label="Hasło"
                    type="password"
                    defaultValue="1234"/>
            </Grid>
            <Grid item>
                <TextField
                    id="authCode"
                    variant="outlined"
                    label="Kod weryfikacyjny"
                    defaultValue="123456"/>
            </Grid>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={2}>
                <Grid item>
                    <Link to="/dashboard">
                        <Button
                            variant={"contained"}
                            startIcon={<InputIcon/>}
                            onClick={login}>Zaloguj
                        </Button>
                    </Link>
                </Grid>
                <Grid item>
                    <Button
                        variant={"contained"}
                        startIcon={<SendIcon/>}
                        onClick={codeRequest}>
                        Wyślij kod
                    </Button>
                </Grid>
                <Grid item>
                    <Link to="/dashboard">
                        <Button
                            variant={"contained"}>
                            Przejdź dalej
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default RootPage;