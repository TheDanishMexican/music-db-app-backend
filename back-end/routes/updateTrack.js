"use strict";

import express from 'express';
import database from '../database.js';

const updateTrack = express.Router();

updateTrack.put('/tracks/:id', (request, response) => {
    const id = request.params.id;
    const track = request.body;
    const query = 'UPDATE tracks SET track_name=?, album_id=?, artist_id=?  WHERE track_id=?;';
    const values = [track.track_name, track.album_id, track.artist_id, id];

    database.query(query, values, (error, results, fields) => {
        if (error) {
            console.log(error);
            response.json({message: error});
        } else {
            response.json(results);
        }
    });
});

export default updateTrack;