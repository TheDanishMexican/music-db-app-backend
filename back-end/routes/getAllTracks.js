"use strict";

import database from "../database.js";
import express from 'express';

const allTracks = express.Router();

//Get all tracks
allTracks.get('/tracks', (request, response) => {
    const query = `
        SELECT tracks.track_id, tracks.track_name, artists.artist_name, albums.album_name
        FROM tracks
        INNER JOIN artists ON tracks.artist_id = artists.artist_id
        INNER JOIN albums ON tracks.album_id = albums.album_id
        ORDER BY tracks.track_name;
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

export default allTracks;