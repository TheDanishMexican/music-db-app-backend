"use strict";

import express from 'express';
import database from '../database.js';

const search = express.Router();

search.get('/search', (request, response) => {
    const searchTerm = `%${request.query.q}%`;
    const values = [searchTerm, searchTerm];
    const query = `
    (
    SELECT
        'album' AS result_type,
        albums.album_id AS id,
        albums.album_name AS name,
        GROUP_CONCAT(DISTINCT artists.artist_name SEPARATOR ', ') AS artist_names,
        GROUP_CONCAT(DISTINCT tracks.track_name SEPARATOR ', ') AS track_names
    FROM
        albums
    INNER JOIN
        track_album ON albums.album_id = track_album.album_id
    INNER JOIN
        tracks ON track_album.track_id = tracks.track_id
    INNER JOIN
        artists ON tracks.artist_id = artists.artist_id
    WHERE
        albums.album_name LIKE '${searchTerm}'
    GROUP BY
        albums.album_id, albums.album_name

)
UNION
(
    SELECT
        'track' AS result_type,
        tracks.track_id AS id,
        tracks.track_name AS name,
        GROUP_CONCAT(DISTINCT albums.album_name ORDER BY albums.album_name ASC) AS album_names,
        GROUP_CONCAT(DISTINCT artists.artist_name SEPARATOR ', ') AS artist_names
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
    WHERE
        tracks.track_name LIKE '${searchTerm}'
    GROUP BY
        tracks.track_id, tracks.track_name
)
ORDER BY
    result_type, name;

    `
console.log(query);
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