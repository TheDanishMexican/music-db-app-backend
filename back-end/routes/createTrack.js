"use strict";

import express from 'express';
import database from '../database.js';

const createTrack = express.Router();

createTrack.post('/tracks', (request, response) => {
    const track = request.body;
    const values = [track.track_name, track.album_id, track.artist_id];
    const queries = [
        'INSERT INTO tracks (track_name, album_id, artist_id) VALUES (?, ?, ?)',
        'SELECT LAST_INSERT_ID();',
        'INSERT INTO track_artist (track_id, artist_id) VALUES (?, ?)',
        'INSERT INTO track_album (track_id, album_id) VALUES (?, ?)',
    ];
        
    database.query(queries[0], values, (error, results, fields) => {
            if (error) {
                console.log(error);
                response.json({ message: error });
            } else {
                const trackId = results.insertId;

                database.query(queries[2], [trackId, track.artist_id], (error, results, fields) => {
                    if (error) {
                        console.log(error);
                        response.json({ message: error });
                    } else {
                        database.query(queries[3], [trackId, track.album_id], (error, results, fields) => {
                            if (error) {
                                console.log(error);
                                response.json({ message: error });
                            } else {
                                console.log({message: 'Created artist'});
                            }
                        });
                    }
                });
            }
        });
    });

export default createTrack;




