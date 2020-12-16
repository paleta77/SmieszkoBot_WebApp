import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography"
import {jwtContext} from '../App'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

function InBox(){
    const [guildsList, setGuildsList] = React.useState([]);
    const [selectedGuild, setSelectedGuild] = React.useState('Wybierz');
    const jsonWebToken = useContext(jwtContext);

    const handleChange = (event) => {
        setSelectedGuild(event.target.value);
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
                setGuildsList(result.toString().substr(0, result.toString().length-1).split(","));
            })
            .catch(error => console.log('error', error));

        setGuildsList(guildsList);

    }, []);

    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));

    const classes = useStyles();

    return(
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Serwer adresata</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedGuild}
                onChange={handleChange}
            >
                {guildsList.map((text) => (
                    <MenuItem value={text}>{text}</MenuItem>
                    ))}
            </Select>
        </FormControl>
    )
}

export default InBox;