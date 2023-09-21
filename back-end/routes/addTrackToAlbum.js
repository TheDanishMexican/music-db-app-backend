"use strict";

import express from 'express';
import database from '../database.js';

const addTrackToAlbum = express.Router();

addTrackToAlbum.post('/track-album', (request, response) => {
    const { track_id, album_id } = request.body;

    if(!track_id || !album_id) {
        return console.log({message: 'Both track_id and artist_id required'});
    }

    const query = 'INSERT INTO track_album (track_id, album_id) VALUES (?, ?)';
    const values = [track_id, album_id];

    database.query(query, values, (error, results, fields) => {
        if (error) {
            console.log(error);
            response.json({message: error});
        } else {
            response.json(results);
        }
    });
});

export default addTrackToAlbum;