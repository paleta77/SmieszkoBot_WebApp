import React, {useContext, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {jwtContext} from "../App";
import {Container, Grid, List, ListItem, Paper, Typography} from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from '@material-ui/core/ListSubheader';
import {FixedSizeList} from 'react-window';
import {makeStyles} from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

let usersList = ['Wczytywanie'];
let selectedAlias = "";

const useStyles = makeStyles((theme) => ({
    listStyle: {
        maxHeight: 400,
    },
}));


function ServerPage() {
    let {id} = useParams();
    const jsonWebToken = useContext(jwtContext);
    const [usersList, setUsersList] = React.useState([]);
    const [dynamicCategoriesList, setDynamicCategoriesList] = React.useState([]);
    const [aliasesList, setAliasesList] = React.useState([]);
    const [rolesAllowedToUseList, setRolesAllowedToUseList] = React.useState([]);

    const [dialogOpen, setDialogOpen] = React.useState(false);

    const handleDialogClose = () => {
        setDialogOpen(false);
        setElementNameToDelete("");
    };

    const classes = useStyles();
    const credentials = "Bearer " + jsonWebToken[0];


    const [elementNameToDelete, setElementNameToDelete] = React.useState("");
    const [elementTypeToDelete, setElementTypeToDelete] = React.useState("");
    const handleDialogOpen = (elementName, elementType) => {
        setElementNameToDelete(elementName);
        setElementTypeToDelete(elementType);
        console.log("Element do usuniecia:" + elementName);
        setDialogOpen(true);
    }

    const handleElementDelete = () => {
        console.log("Usuwam element:" + elementNameToDelete);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", credentials);

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:8500/dashboardData?"
            + "guildName=" + id
            + "&elementType=" + elementTypeToDelete
            + "&elementName=" + elementNameToDelete
            , requestOptions)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("HTTP status " + response.status);
                }
                return response.text();
            })
            .then(function (result) {
                console.log(result);
                switch (elementTypeToDelete){
                    case "alias": {
                        let filtered = aliasesList.filter(function (alias) {
                            return alias.alias_name !== elementNameToDelete;
                        });
                        setAliasesList(filtered);
                        break;
                    }
                    case "dynamicCategory": {
                        let filtered = dynamicCategoriesList.filter(function (category) {
                            return category.category_name !== elementNameToDelete;
                        });
                        setDynamicCategoriesList(filtered);
                        break;
                    }
                    case "allowedRole": {
                        let filtered = rolesAllowedToUseList.filter(function (role) {
                            return role.role_name !== elementNameToDelete;
                        });
                        setRolesAllowedToUseList(filtered);
                        break;
                    }
                    case "user": {
                        let filtered = usersList.filter(function (user) {
                            return user !== elementNameToDelete;
                        });
                        setUsersList(filtered);
                        break;
                    }
                    default:
                        break;
                }
            })
            .catch(error => console.log('error', error));
        handleDialogClose();
    }

    React.useEffect(function effectFunction() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", credentials);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:8500/dashboardData?guildName=" + id, requestOptions)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("HTTP status " + response.status);
                }
                return response.json();
            })
            .then(function (result) {
                console.log(result);
                setUsersList(result.guildUserNames);
                setDynamicCategoriesList(result.dynamicCategories);
                setAliasesList(result.aliases);
                setRolesAllowedToUseList(result.rolesAllowedToUse)
            })
            .catch(error => console.log('error', error));


    }, [id]);

    return (
        <div>
            <Container maxWidth={"xl"}>
                <Typography variant={"h3"}>
                    {id}
                </Typography>
                <Paper>
                    <Grid container>

                        <Grid item xs={3}>

                            <List
                                disablePadding
                                subheader={
                                    <ListSubheader>
                                        Lista użytkowników
                                    </ListSubheader>
                                }>
                                {usersList.map((user) => (
                                    <ListItem button
                                              key={user}
                                              onClick={() => handleDialogOpen(user, "user")}
                                    >
                                        <ListItemIcon><KeyboardArrowRightIcon/></ListItemIcon>
                                        <ListItemText primary={user}/>
                                    </ListItem>
                                ))}
                            </List>

                        </Grid>
                        <Grid item xs={3}>

                            <List
                                disablePadding
                                subheader={
                                    <ListSubheader>
                                        Lista dynamicznych kategorii
                                    </ListSubheader>
                                }>
                                {dynamicCategoriesList.map((category, index) => (
                                    <ListItem button
                                              key={category.category_name}
                                              onClick={() => handleDialogOpen(category.category_name, "dynamicCategory")}
                                    >
                                        <ListItemIcon><KeyboardArrowRightIcon/></ListItemIcon>
                                        <ListItemText primary={category.category_name}/>
                                    </ListItem>
                                ))}
                            </List>

                        </Grid>
                        <Grid item xs={3}>

                            <List
                                disablePadding
                                subheader={
                                    <ListSubheader>
                                        Lista aliasów
                                    </ListSubheader>
                                }>
                                {aliasesList.map((alias, index) => (
                                    <ListItem button
                                              key={alias.alias_name}
                                              onClick={() => handleDialogOpen(alias.alias_name, "alias")}
                                    >
                                        <ListItemIcon><KeyboardArrowRightIcon/></ListItemIcon>
                                        <ListItemText primary={alias.alias_name}/>
                                    </ListItem>
                                ))}
                            </List>

                        </Grid>
                        <Grid item xs={3}>
                            <List
                                disablePadding
                                subheader={
                                    <ListSubheader>
                                        Lista dozwolonych roli
                                    </ListSubheader>
                                }>
                                {rolesAllowedToUseList.map((role, index) => (
                                    <ListItem
                                        button
                                        key={role.role_name}
                                        onClick={() => handleDialogOpen(role.role_name, "allowedRole")}
                                            >
                                        <ListItemIcon><KeyboardArrowRightIcon/></ListItemIcon>
                                        <ListItemText primary={role.role_name}/>
                                    </ListItem>
                                ))}
                            </List>

                        </Grid>

                    </Grid>
                </Paper>
            </Container>
            <Dialog open={dialogOpen} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Usuwanie</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Czy na pewno chcesz usunąć {elementNameToDelete}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Anuluj
                    </Button>
                    <Button onClick={() => handleElementDelete(elementNameToDelete)} color="primary">
                        Usuń
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}

export default ServerPage;