import React, {useContext} from "react";
import Typography from "@material-ui/core/Typography"
import {jwtContext} from '../App'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import InputIcon from "@material-ui/icons/Input";
import {Link} from "react-router-dom";
import SendIcon from '@material-ui/icons/Send';

function InBox() {
    const [guildsList, setGuildsList] = React.useState([]);
    const [usersList, setUsersList] = React.useState([]);
    const [selectedUser, setSelectedUser] = React.useState([]);
    const [selectedGuild, setSelectedGuild] = React.useState([]);
    const jsonWebToken = useContext(jwtContext);

    const handleUserChange = (event) => {
        setSelectedUser(event.target.value);
    }

    const handleGuildChange = (event) => {
        setSelectedGuild(event.target.value);

        const credentials = "Bearer " + jsonWebToken[0];

        var myHeaders = new Headers();
        myHeaders.append("Authorization", credentials);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
            //mode: 'no-cors'
        };

        fetch("http://localhost:8500/guild?guildName=" + event.target.value + "&content=members", requestOptions)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("HTTP status " + response.status);
                }
                return response.json();
            })
            .then(function (result) {
                console.log(result);
                setUsersList(result.toString().substr(0, result.toString().length - 1).split(","));
            })
            .catch(error => console.log('error', error));

        //setGuildsList(guildsList);

    };

    React.useEffect(function effectFunction() {
        const credentials = "Bearer " + jsonWebToken[0];

        var myHeaders = new Headers();
        myHeaders.append("Authorization", credentials);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let username = "paleta77#3712";

        fetch("http://localhost:8500/user?userID=" + username.replace("#", "%23"), requestOptions)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("HTTP status " + response.status);
                }
                return response.json();
            })
            .then(function (result) {
                console.log(result);
                setGuildsList(result.toString().substr(0, result.toString().length - 1).split(","));
            })
            .catch(error => console.log('error', error));

        //setGuildsList(guildsList);

    }, []);

    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 180,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        sendButton: {
            marginBottom: theme.spacing(1)
        }
    }));

    const classes = useStyles();

    return (
        <div>
            <Typography variant="h4" className={classes.typo}>
                Wyślij wiadomość
            </Typography>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Serwer adresata</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedGuild}
                    onChange={handleGuildChange}
                >
                    {guildsList.map((text) => (
                        <MenuItem value={text}>{text}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Adresat</InputLabel>
                {selectedGuild.length > 0 ?
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedUser}
                        onChange={handleUserChange}
                    >
                        {usersList.map((text) => (
                            <MenuItem value={text}>{text}</MenuItem>
                        ))}
                    </Select>
                    :
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedUser}
                        onChange={handleUserChange}
                        disabled
                    >
                        {usersList.map((text) => (
                            <MenuItem value={text}>{text}</MenuItem>
                        ))}
                    </Select>}
            </FormControl>
            <TextField
                id="standard-basic"
                label="Temat"
                multiline
                rows={1}
                variant="filled"
                fullWidth
                className={classes.sendButton}
            />
            <TextField
                id="standard-basic"
                label="Treść"
                multiline
                rows={15}
                variant="filled"
                fullWidth
                className={classes.sendButton}
            />
            <Button
                variant={"contained"}
                startIcon={<SendIcon/>}

                >
                Wyślij
            </Button>
        </div>

    )
}

export default InBox;