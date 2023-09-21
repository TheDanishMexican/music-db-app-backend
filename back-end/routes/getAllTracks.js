"use strict";

import database from "../database.js";
import express from 'express';

const allTracks = express.Router();

//Get all tracks
allTracks.get('/tracks', (request, response) => {
    const query = `
        SELECT
        tracks.track_name,
        GROUP_CONCAT(DISTINCT albums.album_name ORDER BY albums.album_name ASC) AS album_names,
        GROUP_CONCAT(DISTINCT artists.artist_name ORDER BY artists.artist_name ASC) AS artist_names
        FROM
            tracks
        INNER JOIN
            track_album ON tracks.track_id = track_album.track_id
        INNER JOIN
            albums ON track_album.album_id = albums.album_id
        INNER JOIN
            track_artist ON tracks.track_id = track_artist.track_id
        INNER JOIN
            artists ON track_artist.artist_id = artists.artist_id
        GROUP BY
            tracks.track_name;
    `

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