import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import {withRouter} from "react-router-dom";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import ServerList from "../elements/ServersList";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import DnsIcon from '@material-ui/icons/Dns';
import {Switch, Route, Link} from "react-router-dom";
import Inbox from "./Inbox";
import OutBox from "./OutBox";
import ServerPage from "./ServerPage";

export function Dashboard({logout, ...rest}) {

    const drawerWidth = 240;

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerContainer: {
            overflow: 'auto',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        nested: {
            paddingLeft: theme.spacing(3),
        },
        link: {
            textDecoration: 'none'
        }
    }));

    const classes = useStyles();

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const handleClick = (event, index) => {
        setOpen(!open);
        setSelectedIndex(index);
    };

    return (

        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        EncryptBot
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar/>
                <div className={classes.drawerContainer}>
                    <List>
                        <ListItem
                            button
                            selected={selectedIndex === 0}
                            onClick={(event) => handleListItemClick(event, 0)}
                            component={Link} to={'/dashboard/inbox'}
                        >
                            <ListItemIcon>
                                <InboxIcon/>
                            </ListItemIcon>
                            <Typography variant="body2" color="textPrimary">
                            <ListItemText primary="Skrzynka odbiorcza"/>
                            </Typography>
                        </ListItem>
                        <ListItem
                            button
                            selected={selectedIndex === 1}
                            onClick={(event) => handleListItemClick(event, 1)}
                            component={Link} to={'/dashboard/outbox'}
                        >
                            <ListItemIcon>
                                <MailIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Wyślij wiadomość"/>
                        </ListItem>
                        <ListItem
                            button
                            selected={selectedIndex === 2}
                            onClick={(event) => handleClick(event, 2)}
                        >
                            <ListItemIcon>
                                <DnsIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Twoje serwery"/>
                            {open ? <ExpandLess/> : <ExpandMore/>}
                        </ListItem>
                        <Collapse in={open}>
                            <ServerList/>
                        </Collapse>
                    </List>

                </div>
            </Drawer>
            <main className={classes.content}>
                <Toolbar/>
                <Switch>
                    <Route path="/dashboard/inbox">
                        <Inbox/>
                    </Route>
                    <Route path="/dashboard/outbox">
                        <OutBox/>
                    </Route>
                    <Route path="/dashboard/server/:id">
                        <ServerPage/>
                    </Route>
                </Switch>
            </main>
        </div>
    )
}

export default withRouter(Dashboard);