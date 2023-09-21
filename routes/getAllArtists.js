"use strict";

import database from "../database.js";
import express from 'express';

const allArtists = express.Router();

allArtists.get('/artists', (request, response) => {
    const query = 'SELECT * FROM artists ORDER BY artist_name';

    database.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
            response.json({messsage: error});
        } else {
            response.json(results);
        }
    });
});

export default allArtists;