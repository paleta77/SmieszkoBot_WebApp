import React, {useContext} from "react";
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

    getUsers(jsonWebToken, id).then(users => {
        console.log("getting users");
        let usersListText = users.toString();
        usersList = usersListText.substr(0, usersListText.length - 1).split(",");
        console.log(usersList);
        }
    )

    console.log("auto getted users");
    console.log(usersList);

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