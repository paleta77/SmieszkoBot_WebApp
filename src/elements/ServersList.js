import React from "react";
import {List, ListItem} from "@material-ui/core";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme => ({
    nested: {
        paddingLeft: theme.spacing(3),
    }
})))

function getItems(){

}

function ServerList() {

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const classes = useStyles();

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const handleClick = () => {
        setOpen(!open);
    };

    return(
        <List>
            <ListItem
                button
                selected={selectedIndex===0}
                onClick={(event) => handleListItemClick(event, 0)}
                >
                serwer1
            </ListItem>
            <ListItem
                button
                selected={selectedIndex===1}
                onClick={(event) => handleClick(event, 1)}
            >
                serwer2
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
                <Collapse in={open}>
                    <List disablePadding>
                        <ListItem
                            button
                            className={classes.nested}
                            selected={selectedIndex===2}
                            onClick={(event => handleListItemClick(event, 2))}
                            >
                            serwer 3
                        </ListItem>
                    </List>
                </Collapse>
        </List>
    )
}

export default ServerList;

