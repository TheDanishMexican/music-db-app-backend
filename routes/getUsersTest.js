"use strict";

import database from "../database.js";
import express from 'express';

const getUsers = express.Router();

//Get all tracks
getUsers.get('/users', (request, response) => {
    const query = `
SELECT * FROM users;
    `

    database.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
            response.json({message: error});
        } else {
            response.json(results);
        }
    });
});

export default getUsers;