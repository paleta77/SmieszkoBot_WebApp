import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import InputIcon from "@material-ui/icons/Input";
import SendIcon from "@material-ui/icons/Send";
import {Container} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles((theme) => ({
    box: {
        border: "1px",
        borderStyle: "solid",
        borderRadius: "15px",
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing(8),
    },
    typo: {
        marginBottom: theme.spacing(3)
    },
    registerText: {
        marginTop: theme.spacing(2)
    },
    root: {
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    }
}))

function LoginGrid({
                       login,
                       codeRequest,
                   }) {
    const classes = useStyles();
    return (
        <Container className={classes.paper}>
            <LockOutlinedIcon />
            <Typography variant="h4" className={classes.typo}>
                Logowanie
            </Typography>
                <Grid
                    container
                    spacing={2}
                    className={classes.box}
                >
                    <Grid
                        item
                        xs={12}>
                        <TextField
                            fullWidth
                            id="username"
                            variant="outlined"
                            label="Nazwa użytkownika"
                            defaultValue="paleta77#3712"
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}>
                        <TextField
                            fullWidth
                            id="password"
                            variant="outlined"
                            label="Hasło"
                            type="password"
                            defaultValue="1234"/>
                    </Grid>
                    <Grid
                        item
                        xs={12}>
                        <TextField
                            fullWidth
                            id="authCode"
                            variant="outlined"
                            label="Kod weryfikacyjny"
                            defaultValue="123456"/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Link to="/dashboard">
                            <Button
                                fullWidth
                                variant={"contained"}
                                startIcon={<InputIcon/>}
                                onClick={login}>Zaloguj
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            fullWidth
                            variant={"contained"}
                            startIcon={<SendIcon/>}
                            onClick={codeRequest}>
                            Wyślij kod
                        </Button>
                    </Grid>
                    <Grid item xs>
                        <Link to="/dashboard">
                            <Button
                                fullWidth
                                variant={"contained"}>
                                Przejdź dalej
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            <Grid
                container
                justify="flex-end">
                <Grid item className={classes.registerText}>
                    <Link to="#">
                        <Typography variant="body2" color="primary">
                            Nie masz konta? Zarejestruj się
                        </Typography>
                    </Link>
                </Grid>
            </Grid>
        </Container>
    )
}

export default LoginGrid;