"use strict";

import express from 'express';
import database from '../database.js';

const search = express.Router();

search.get('/search', (request, response) => {
    const searchTerm = `%${request.query.q}%`;
    const values = [searchTerm, searchTerm, searchTerm];
    const query = `SELECT tracks.track_id, tracks.track_name, artists.artist_name AS track_artist_name, 
            albums.album_id, albums.album_name, artists2.artist_name AS album_artist_name
            FROM tracks
            LEFT JOIN artists ON tracks.artist_id = artists.artist_id
            LEFT JOIN albums ON tracks.album_id = albums.album_id
            LEFT JOIN artists AS artists2 ON albums.artist_id = artists2.artist_id
            WHERE tracks.track_name LIKE ? OR
            artists.artist_name LIKE ? OR
            albums.album_name LIKE ?;
        `;


    database.query(query, values, (error, results, fields) => {
        if (error) {
            console.log(error);
            response.json({message: error});
        } else {
            response.json(results);
        }
    });
});

export default search;