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
    buttonClass: {
        marginTop: theme.spacing(2)
    }
}));

// let messages = {
//     messagesList: ["test mess"]
// };

//let messageList= [];

function getFromUser(item) {
    return item.from_user;
}

function useForceUpdate(){
    const [value, setValue] = React.useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}


function Box(boxType) {
    const jsonWebToken = useContext(jwtContext);
    const [messageList, setMessageList] = React.useState([]);
    const [value, setValue] = React.useState(0);

    function decryptAllMessages(privateKey){

        console.log("decrypting mess");
        for(let i = 0; i<messageList.length; i++){
            messageList[i].topic = decryptString(messageList[i].topic, privateKey);
            messageList[i].message = decryptString(messageList[i].message, privateKey);
        }
        console.log("messageList", messageList);
        let somevalue = value; //to refresh messages
        setValue(++somevalue);
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

        fetch("http://localhost:8500/crypto?BoxType=" + boxType.boxType, requestOptions)
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
    }, [boxType]);


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
                className={classes.buttonClass}
                variant={"contained"}
                startIcon={<InputIcon/>}
                onClick={() =>{decryptAllMessages(document.getElementById("privateKey").value)}}>
                Odszyfruj
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
                                    {boxType.boxType === "inbox" ?
                                        mes.from_user
                                    :
                                        mes.to_user}
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

export default Box;