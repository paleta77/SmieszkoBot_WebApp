import React, {useContext} from "react";
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from "@material-ui/core/Typography";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {jwtContext} from "../App";
import {TextFields} from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import InputIcon from "@material-ui/icons/Input";
import Button from "@material-ui/core/Button";
import {decryptString} from "../Crypter"

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

function getFromUser(item) {
    return item.from_user;
}

function OutBox() {
    const jsonWebToken = useContext(jwtContext);
    const [messageList, setMessageList] = React.useState([]);

    function decryptAllMessages(privateKey){
        for(let i = 0; i<messageList.length; i++){
            //decryptString(messageList[i].topic, privateKey);
            decryptString(messageList[i].message, privateKey);
        }
    }

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
                for (let i = 0; i < messagesJson.messagesList.length; i++) {
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
    return (
        <div>
            <TextField
                fullWidth
                id="privateKey"
                variant="outlined"
                label="Klucz prywatny"
                defaultValue=""/>
            <Button
                variant={"contained"}
                startIcon={<InputIcon/>}
                onClick={() =>{decryptAllMessages(document.getElementById("privateKey").value)}}>
                Zaloguj
            </Button>
        <List>
            {messageList.map((mes) => (
                <div>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                        </ListItemAvatar>
                        <ListItemText
                            primary={mes.topic}
                            secondary={
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="textPrimary"
                                >
                                    {mes.from_user}
                                </Typography>
                            }
                        />
                    </ListItem>
                    <ListItem>{mes.message}</ListItem>
                </div>
            ))}
        </List>
        </div>

        //<Divider/>
        //{messageList.map((mes => mes.from_user))}
    )
}

export default OutBox;