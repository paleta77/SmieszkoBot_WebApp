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
    const [isAdmin, setIsAdmin] = React.useState(false);

    const classes = useStyles();

    const credentials = "Bearer " + jsonWebToken[0];
    //const credentials = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXUyJ9.eyJpc3MiOiJhdXRoMCJ9.AbIJTDMFc7yUa5MhvcP03nJPyCPzZtQcGEp-zWfOkEE";

    const [addDialogOpen, setAddDialogOpen] = React.useState(false);
    const [elementTypeToAdd, setElementTypeToAdd] = React.useState("");
    // const [elementNameToAdd, setElementNameToAdd] = React.useState("");
    // const [elementLinkToAdd, setElementLinkToAdd] = React.useState("");
    const handleAddDialogOpen = (elementType) => {
        setElementTypeToAdd(elementType);
        setAddDialogOpen(true);
    }
    const handleAddDialogClose = () => {
        setAddDialogOpen(false);
        setElementTypeToAdd("");
    };

    const handleElementAdd = () => {
        const elementName = document.getElementById("elementName").value;
        console.log("elementName ", elementName);

        var myHeaders = new Headers();
        myHeaders.append("Authorization", credentials);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        let urlString = "https://localhost:8500/dashboardData?"
            + "guildName=" + id
            + "&elementType=" + elementTypeToAdd
            + "&elementName=" + elementName;

        if(elementTypeToAdd==="alias"){
            const elementLink = document.getElementById("elementLink").value;
            if (elementLink != null && elementLink !== "null") {
                urlString += "&elementLink=" + elementLink;
            }
        }

        fetch(urlString
            , requestOptions)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("HTTP status " + response.status);
                }
                return response.json();
            })
            .then(function (result) {
                switch (elementTypeToAdd){
                    case "alias": {
                        setAliasesList(result.aliases);
                        break;
                    }
                    case "dynamicCategory": {
                        setDynamicCategoriesList(result.dynamicCategories);
                        break;
                    }
                    case "allowedRole": {
                        setRolesAllowedToUseList(result.rolesAllowedToUse)
                        break;
                    }
                    default:
                        break;
                }
            })
            .catch(error => console.log('error', error));
        handleAddDialogClose();
    };

    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [elementTypeToDelete, setElementTypeToDelete] = React.useState("");
    const [elementNameToDelete, setElementNameToDelete] = React.useState("");

    const handleDeleteDialogOpen = (elementName, elementType) => {
        if(isAdmin) {
            setElementNameToDelete(elementName);
            setElementTypeToDelete(elementType);
            setDeleteDialogOpen(true);
        }
    }
    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
        setElementNameToDelete("");
    };

    const handleElementDelete = () => {
        console.log("Usuwam element:" + elementNameToDelete);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", credentials);

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://localhost:8500/dashboardData?"
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
        handleDeleteDialogClose();
    }

    React.useEffect(function effectFunction() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", credentials);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://localhost:8500/dashboardData?guildName=" + id, requestOptions)
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
                setRolesAllowedToUseList(result.rolesAllowedToUse);
                setIsAdmin(result.isAdmin);
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
                                              onClick={() => handleDeleteDialogOpen(user, "user")}
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
                                              onClick={() => handleDeleteDialogOpen(category.category_name, "dynamicCategory")}
                                    >
                                        <ListItemIcon><KeyboardArrowRightIcon/></ListItemIcon>
                                        <ListItemText primary={category.category_name}/>
                                    </ListItem>
                                ))}
                            </List>
                            {isAdmin ? <Button
                                onClick={() => handleAddDialogOpen("dynamicCategory")}
                            >Dodaj
                            </Button>
                            :
                            <div/>}
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
                                              onClick={() => handleDeleteDialogOpen(alias.alias_name, "alias")}
                                    >
                                        <ListItemIcon><KeyboardArrowRightIcon/></ListItemIcon>
                                        <ListItemText primary={alias.alias_name}/>
                                    </ListItem>
                                ))}
                            </List>
                            {isAdmin ? <Button
                                onClick={() => handleAddDialogOpen("alias")}
                            >Dodaj
                            </Button>
                            :
                            <div/>}
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
                                        onClick={() => handleDeleteDialogOpen(role.role_name, "allowedRole")}
                                            >
                                        <ListItemIcon><KeyboardArrowRightIcon/></ListItemIcon>
                                        <ListItemText primary={role.role_name}/>
                                    </ListItem>
                                ))}
                            </List>
                            {isAdmin ?
                                <Button
                                onClick={() => handleAddDialogOpen("allowedRole")}
                                >
                                    Dodaj
                                </Button>
                            :
                            <div/>}
                        </Grid>

                    </Grid>
                </Paper>
            </Container>
            <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Usuwanie</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Czy na pewno chcesz usunąć {elementNameToDelete}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose} color="primary">
                        Anuluj
                    </Button>
                    <Button onClick={() => handleElementDelete()} color="primary">
                        Usuń
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={addDialogOpen} onClose={handleAddDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Dodawanie</DialogTitle>
                <DialogContent>
                    <TextField
                        id="elementName"
                        label={"Nazwa"}
                        fullWidth
                    />
                    {elementTypeToAdd === "alias" ?
                        <TextField
                            id="elementLink"
                            label={"link"}
                            fullWidth
                        />
                    :
                        <div></div>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddDialogClose} color="primary">
                        Anuluj
                    </Button>
                    <Button onClick={() => handleElementAdd()} color="primary">
                        Dodaj
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}

export default ServerPage;