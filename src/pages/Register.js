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
import {generateRSAKeys} from "../Crypter";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from "@material-ui/core/DialogTitle";

const loginCodeRequest = () => {
    var myHeaders = new Headers();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const credentials = "Basic " + username + ":" + password;
    myHeaders.append("Authorization", credentials);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://localhost:8500/code?userID=" + username.replace("#", "%23") + "&guildID=164834533001134080&codeType=register", requestOptions)
        .then(function (response) {
            if (!response.ok) {
                throw new Error("HTTP status " + response.status);
            }
            return response.json();
        })
        .then(function (result) {
            console.log(result);
            console.log(result.code);

        })
        .catch(error => console.log('error', error));
}

let registered = false;

const register = () => {
    var myHeaders = new Headers();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const credentials = "Basic " + username + ":" + password;
    myHeaders.append("Authorization", credentials);

    const keyPair = generateRSAKeys();

    let body = {
        username: username,
        password: password,
        publicKey: keyPair.publicKey
    }

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        body: JSON.stringify(body)
    };

    fetch("https://localhost:8500/register", requestOptions)
        .then(function (response) {
            if (!response.ok) {
                throw new Error("HTTP status " + response.status);
            }
            return response.text();
        })
        .then(function (result) {
            console.log(result);
            document.getElementById("privateKey").value = keyPair.privateKey;
            registered = true;
        })
        .catch(error => console.log('error', error));
}

const useStyles = makeStyles((theme) => ({
    box: {
        border: "1px",
        borderStyle: "solid",
        borderRadius: "15px",
        padding: theme.spacing(1),
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
    smallTypo: {
        marginTop: theme.spacing(2)
    },
    registerText: {
        marginTop: theme.spacing(2)
    },
    root: {
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
    dialogs:{
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2),
    }
}))



function Register(){
    const classes = useStyles();
    return(
        <Container className={classes.paper} maxWidth="xs">
            <LockOutlinedIcon />
            <Typography variant="h4" className={classes.typo}>
                Rejestracja
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
                        type="password"/>
                </Grid>
                <Grid
                    item
                    xs={12}>
                    <TextField
                        fullWidth
                        id="authCode"
                        variant="outlined"
                        label="Kod weryfikacyjny"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Link to="#">
                        <Button
                            fullWidth
                            variant={"contained"}
                            startIcon={<InputIcon/>}
                            onClick={register}
                            >Zarejestruj
                        </Button>
                    </Link>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                        fullWidth
                        variant={"contained"}
                        startIcon={<SendIcon/>}
                        onClick={loginCodeRequest}
                        >
                        Wyślij kod
                    </Button>
                </Grid>
            </Grid>
            <Grid
                container
                justify="flex-end">
                <Grid item className={classes.registerText}>
                    <Link to="/">
                        <Typography variant="body2" color="primary">
                            Masz konto? Zaloguj się
                        </Typography>
                    </Link>
                </Grid>
            </Grid>
                <TextField
                id="privateKey"
                label="Twój klucz prywatny"
                fullWidth
                multiline
                rows={10}
                variant={"outlined"}
                defaultValue="Pojawi się tutaj po pomyślnej rejestracji"
                className={classes.smallTypo}
            />
                <Typography variant="body2" className={classes.smallTypo}>
                    Zapisz ten klucz gdyż nie pojawi się już nigdy więcej.
                </Typography>
        </Container>
    )
}

export default Register;