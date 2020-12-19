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

//let messageList= [];

function getFromUser(item){
    return item.from_user;
}

function OutBox(){
    const jsonWebToken = useContext(jwtContext);
    const [messageList, setMessageList] = React.useState([]);

    React.useEffect(function effectFunction() {
        const credentials = "Bearer " + jsonWebToken[0];

        var myHeaders = new Headers();
        myHeaders.append("Authorization", credentials);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        fetch("http://localhost:8500/crypto", requestOptions)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("HTTP status " + response.status);
                }
                return response.json();
            })
            .then(function (messagesJson) {
                console.log(messagesJson);
                setMessageList([]);
                let tempMessageList = [];
                for(let i = 0; i<messagesJson.messagesList.length; i++){
                    let message = {
                        from_user: messagesJson.messagesList[i].from_user,
                        to_user: messagesJson.messagesList[i].to_user,
                        topic: messagesJson.messagesList[i].topic,
                        message: messagesJson.messagesList[i].message

                    }
                    tempMessageList.push(message);
                }
                setMessageList(tempMessageList);
            })
            .catch(error => console.log('error', error));
    }, []);


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