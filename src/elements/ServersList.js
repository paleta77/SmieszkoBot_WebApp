import React, {useContext} from "react";
import {List, ListItem} from "@material-ui/core";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import {makeStyles} from "@material-ui/styles";
import {Link} from "react-router-dom";
import {jwtContext} from "../App";

const drawerWidth = 240;

const useStyles = makeStyles((theme => ({})))
let serverList = ['Inbox', 'Starred', 'Send email', 'Drafts', 'test'];

async function getItems(jwt) {

    const credentials = "Bearer " + jwt[0];
    console.log(jwt[0]);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", credentials);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    let username = "paleta77#3712";

    const response = await fetch("http://localhost:8500/user?userID=" + username.replace("#", "%23"), requestOptions)
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
        console.log(servers);
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

