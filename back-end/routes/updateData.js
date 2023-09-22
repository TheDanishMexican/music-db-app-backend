"use strict";

import express from 'express';
import database from '../database.js';

const updateData = express.Router();

// Opdatering af artist
updateData.put('/artists/:id', (request, response) => {
    const artistId = request.params.id;
    const updatedArtist = request.body;

    const query = 'UPDATE artists SET artist_name = ? WHERE artist_id = ?';
    const values = [updatedArtist.artist_name, artistId];

    database.query(query, values, (error, results, fields) => {
        if (error) {
            console.log(error);
            response.json({ message: error });
        } else {
            response.json({ message: 'Artist opdateret med succes' });
        }
    });
});

// Opdatering af album
updateData.put('/albums/:id', (request, response) => {
    const albumId = request.params.id;
    const updatedAlbum = request.body;

    const query = 'UPDATE albums SET album_name = ? WHERE album_id = ?';
    const values = [updatedAlbum.album_name, albumId];

    database.query(query, values, (error, results, fields) => {
        if (error) {
            console.log(error);
            response.json({ message: error });
        } else {
            response.json({ message: 'Album opdateret med succes' });
        }
    });
});

// Opdatering af track
updateData.put('/tracks/:id', (request, response) => {
    const trackId = request.params.id;
    const updatedTrack = request.body;

    const query = 'UPDATE tracks SET track_name = ? WHERE track_id = ?';
    const values = [updatedTrack.track_name, trackId];

    database.query(query, values, (error, results, fields) => {
        if (error) {
            console.log(error);
            response.json({ message: error });
        } else {
            response.json({ message: 'Track opdateret med succes' });
        }
    });
});

export default updateData;
