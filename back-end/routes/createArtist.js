"use strict";

import express from 'express';
import database from '../database.js';

const createArtist = express.Router();

createArtist.post('/artists', (request, response) => {
    const artist = request.body;
    const query = 'INSERT INTO artists(artist_name) values(?);';
    const values = [artist.artist_name];

    database.query(query, values, (error, results, fields) => {
        if (error) {
            console.log(error);
            response.json({message: error});
        } else {
            response.json(results);
        }
    });
});

export default createArtist;
