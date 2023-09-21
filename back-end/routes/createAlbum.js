"use strict";

import express from 'express';
import database from '../database.js';

const createAlbum = express.Router();

createAlbum.post('/albums', (request, response) => {
    const album = request.body;
    const query = 'INSERT INTO albums(album_name, artist_id) values(?, ?);';
    const values = [album.album_name, album.artist_id];

    database.query(query, values, (error, results, fields) => {
        if (error) {
            console.log(error);
            response.json({message: error});
        } else {
            response.json(results);
        }
    });
});

export default createAlbum;