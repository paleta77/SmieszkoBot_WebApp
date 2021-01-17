import React, {useContext} from "react";
import {List, ListItem} from "@material-ui/core";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import {makeStyles} from "@material-ui/styles";
import {Link} from "react-router-dom";
import {jwtContext, jwtVariable} from "../App";

const drawerWidth = 240;

const useStyles = makeStyles((theme => ({})))
let serverList = ['Wczytywanie'];

function jwtDecode(jwt){
    console.log("jwt decode", jwt);
    return JSON.parse(atob(jwt.split('.')[1]));
}

async function getItems(jwt) {

    const credentials = "Bearer " + jwt[0];

    var myHeaders = new Headers();
    myHeaders.append("Authorization", credentials);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    const decodedJWT = jwtDecode(jwtVariable);
    let username = decodedJWT.username;

    const response = await fetch("https://localhost:8500/user?userID=" + username.replace("#", "%23"), requestOptions)
    const serverList = await response.json();

    return serverList;

}

function ServerList() {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const jsonWebToken = useContext(jwtContext);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    getItems(jsonWebToken).then(servers => {
        let serversListText = servers.toString();
        serverList = serversListText.substr(0, serversListText.length - 1).split(",");
    });

    return (
        <List disablePadding>
            {serverList.map((text, index) => (
                <ListItem  button key={text}
                           selected={selectedIndex === index}
                           onClick={(event) => handleListItemClick(event, index)}
                component={Link} to={"/dashboard/server/" + text}>
                    <ListItemIcon><KeyboardArrowRightIcon/></ListItemIcon>
                    <ListItemText primary={text}/>
                </ListItem>
            ))}
        </List>

    )
}

export default ServerList;

