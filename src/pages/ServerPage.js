import React, {useContext, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {jwtContext} from "../App";
import {List, ListItem, Typography} from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from '@material-ui/core/ListSubheader';
import { FixedSizeList } from 'react-window';

let usersList = ['Wczytywanie'];


async function getUsers(jwt, id) {


    const credentials = "Bearer " + jwt[0];

    var myHeaders = new Headers();
    myHeaders.append("Authorization", credentials);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const response = await fetch("http://localhost:8500/guild?guildName=" + id + "&content=members", requestOptions)
    return await response.text();
}

function ServerPage(){
    let { id } = useParams();
    const jsonWebToken = useContext(jwtContext);
    const [usersList, setUsersList] = React.useState([]);

    const credentials = "Bearer " + jsonWebToken[0];

    var myHeaders = new Headers();
    myHeaders.append("Authorization", credentials);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };


    React.useEffect(function effectFunction() {
        fetch("http://localhost:8500/guild?guildName=" + id + "&content=members", requestOptions)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("HTTP status " + response.status);
                }
                return response.json();
            })
            .then(function (result) {
                console.log(result);
                setUsersList(result.toString().substr(0, result.toString().length-1).split(","));
            })
            .catch(error => console.log('error', error));


    }, [id]);

    return (
        <div>
            <Typography variant={"h3"}>
                {id}
            </Typography>
            <List
                disablePadding
            subheader={
                <ListSubheader>
                    Lista użytkowników
                </ListSubheader>
            }>
                {usersList.map((text, index) => (
                    <ListItem  button key={text}>
                        <ListItemIcon><KeyboardArrowRightIcon/></ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default ServerPage;