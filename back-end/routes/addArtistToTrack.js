"use strict";

import express from 'express';
import database from '../database.js';

const addArtistToTrack = express.Router();

addArtistToTrack.post('/track-artist', (request, response) => {
    const { track_id, artist_id } = request.body;

    if(!track_id || !artist_id) {
        return console.log({message: 'Both track_id and artist_id required'});
    }

    const query = 'INSERT INTO track_artist (track_id, artist_id) VALUES (?, ?)';
    const values = [track_id, artist_id];

    database.query(query, values, (error, results, fields) => {
        if (error) {
            console.log(error);
            response.json({message: error});
        } else {
            response.json(results);
        }
    });
});

export default addArtistToTrack;