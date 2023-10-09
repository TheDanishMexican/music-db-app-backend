"use strict";

import database from "../database.js";
import express from 'express';

const allTracks = express.Router();

//Get all tracks
allTracks.get('/tracks', (request, response) => {
    const query = `
    SELECT track_name, track_id
    FROM tracks
    `

    database.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
            response.json({ message: error });
        } else {
            response.json(results);
        }
    });
});

export default allTracks;