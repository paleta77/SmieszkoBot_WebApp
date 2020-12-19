import React, {useContext} from "react";
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from "@material-ui/core/Typography";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {jwtContext} from "../App";

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

// let messages = {
//     messagesList: ["test mess"]
// };

let messageList= [];

function getFromUser(item){
    return item.from_user;
}

async function getMessages(jwt){
    const credentials = "Bearer " + jwt[0];

    var myHeaders = new Headers();
    myHeaders.append("Authorization", credentials);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };

    const response = await fetch("http://localhost:8500/crypto", requestOptions);
    return await response.json();
}

function OutBox(){
    const jsonWebToken = useContext(jwtContext);

    getMessages(jsonWebToken).then(messagesJson => {
        messageList = [];
        for(let i = 0; i<messagesJson.messagesList.length; i++){
            let message = {
                 from_user: messagesJson.messagesList[i].from_user,
                 to_user: messagesJson.messagesList[i].to_user,
                 topic: messagesJson.messagesList[i].topic,
                 message: messagesJson.messagesList[i].message

            }
            messageList.push(message);
            //console.log("message", message);
            //console.log("messageList", messageList);
            //console.log("FromList", messageList.map(mes => mes.from_user));

            //console.log(messagesJson.messagesList[i]);
        }

    });

    const classes = useStyles();
    return(
        <List>
            <ListItem alignItems="flex-start">
                {messageList.map(mes => mes.from_user)}
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
        </List>

        //<Divider/>
    )
}

export default OutBox;