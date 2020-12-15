import React from "react";
import {List, ListItem} from "@material-ui/core";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {makeStyles} from "@material-ui/styles";
import {Link} from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme => ({})))

function getItems() {


    return ['Inbox', 'Starred', 'Send email', 'Drafts', 'test'];

}

function ServerList() {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <List disablePadding>
            {getItems().map((text, index) => (
                <ListItem  button key={text}
                           selected={selectedIndex === index}
                           onClick={(event) => handleListItemClick(event, index)}
                component={Link} to={"/dashboard/server/" + text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                    <ListItemText primary={text}/>
                </ListItem>
            ))}
        </List>

    )
}

export default ServerList;

