import React, {useContext} from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from "@material-ui/core/Typography";
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {jwtContext} from "../App";
import {jwtDecode} from "../Crypter";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));


function OutBox(){
    const jsonWebToken = useContext(jwtContext);
    const decodedJWT = jwtDecode(jsonWebToken[0]);

    React.useEffect(function effectFunction() {
        const credentials = "Bearer " + jsonWebToken[0];

        var myHeaders = new Headers();
        myHeaders.append("Authorization", credentials);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        let username = "paleta77#3712";

        fetch("http://localhost:8500/crypto", requestOptions)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("HTTP status " + response.status);
                }
                return response.json();
            })
            .then(function (result) {
                console.log(result);
                //setGuildsList(result.toString().substr(0, result.toString().length - 1).split(","));
            })
            .catch(error => console.log('error', error));

        //setGuildsList(guildsList);

    }, []);

    const classes = useStyles();
    return(
        <List>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary="Brunch this weekend?"
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                Ali Connors
                            </Typography>
                            {" — I'll be in your neighborhood doing errands this…"}
                        </React.Fragment>
                    }
                />
            </ListItem>
        <Divider/>
        </List>
    )
}

export default OutBox;