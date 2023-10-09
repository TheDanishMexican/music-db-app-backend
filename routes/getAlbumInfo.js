"use strict"

import express from "express"
import database from "../database.js"

const getAlbumInfo = express.Router();

getAlbumInfo.get(`/albums/:id`, (request, response) => {
    const id = request.params.id;

    const query = `
SELECT 
    albums.album_id, 
    albums.album_name, 
    tracks.track_id, 
    tracks.track_name
FROM 
    albums
LEFT JOIN 
    tracks ON albums.album_id = tracks.album_id
WHERE 
    albums.album_id = ?;


            `

    const values = [id];

    database.query(query, values, (error, results, fields) => {
        if (error) {
            console.log(error);
            response.status(500).json({ message: 'Fejl ved hentning af albuminfo' });
        } else {
            if (results.length === 0) {
                response.status(404).json({ message: 'Album blev ikke fundet' });
            } else {
                const albumInfo = {
                    album_id: results[0].album_id,
                    album_name: results[0].album_name,
                    artist_name: results[0].artist_name,
                    tracks: results.map(track => ({
                        track_id: track.track_id,
                        track_name: track.track_name
                    }))
                };
                response.json(albumInfo);
            }
        }
    });
});

export default getAlbumInfo