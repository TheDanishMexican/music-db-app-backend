"use strict";

import database from "../database.js";
import express from 'express';

const allAlbums = express.Router();

allAlbums.get('/albums', (request, response) => {
    const query = `
        SELECT
            albums.album_name,
            GROUP_CONCAT(DISTINCT artists.artist_name ORDER BY artists.artist_name ASC) AS artist_names,
            GROUP_CONCAT(tracks.track_name ORDER BY tracks.track_name ASC) AS track_names
        FROM
            albums
        INNER JOIN
            track_album ON albums.album_id = track_album.album_id
        INNER JOIN
            tracks ON track_album.track_id = tracks.track_id
        INNER JOIN
            artists ON tracks.artist_id = artists.artist_id
        GROUP BY
            albums.album_name;
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

export default allAlbums;