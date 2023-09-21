"use strict";

import express from 'express';
import database from '../database.js';

const getOneAlbum = express.Router();

getOneAlbum.get('/albums/:id', (request, response) => {
    const id = request.params.id;
    const query = `
        SELECT albums.album_id, albums.album_name, albums.artist_id, 
               tracks.track_id, tracks.track_name
        FROM albums
        LEFT JOIN tracks ON albums.album_id = tracks.album_id
        WHERE albums.album_id = ?;`;
    const values = [id];

    database.query(query, values, (error, results, fields) => {
        if (error) {
            console.log(error);
            response.json({message: error});
        } else {
            if (results.length === 0) {
                response.status(404).json({ message: 'Album not found' });
            } else {
                // Check if there are no tracks associated with the album
                if (results[0].track_id === null) {
                    // Handle the case where no tracks are found
                    const albumInfo = {
                        album_id: results[0].album_id,
                        album_name: results[0].album_name,
                        artist_id: results[0].artist_id,
                        tracks: [] // Empty array indicates no tracks
                    };
                    response.json(albumInfo);
                } else {
                    // Group tracks by album
                    const albumInfo = {
                        album_id: results[0].album_id,
                        album_name: results[0].album_name,
                        artist_id: results[0].artist_id,
                        tracks: results.map(track => ({
                            track_id: track.track_id,
                            track_name: track.track_name
                        }))
                    };
                    response.json(albumInfo);
                }
            }
        }
    });
});

export default getOneAlbum;
