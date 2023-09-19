"use strict";

import database from "../database.js";
import express from 'express';

const allAlbums = express.Router();

allAlbums.get('/albums', (request, response) => {
    const query = `
        SELECT albums.album_id, albums.album_name, artists.artist_name
        FROM albums
        INNER JOIN artists ON albums.artist_id = artists.artist_id
        ORDER BY albums.album_name;
    `;

    database.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
            response.json({message: error});
        } else {
            response.json(results);
        }
    });
});

export default allAlbums;