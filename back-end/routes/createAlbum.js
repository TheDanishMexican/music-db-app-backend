"use strict";

import express from 'express';
import database from '../database.js';

const createAlbum = express.Router();

// Create an album with an artist and tracks
createAlbum.post('/albums', async (req, res) => {
    try {
        const { albumName, artistName, tracks } = req.body;

        // Check if the artist exists in the database
        const [existingArtist] = await database.promise().query('SELECT id FROM Artists WHERE artistName = ?', [artistName]);

        let artistId;

        if (existingArtist && existingArtist.length > 0) {
            // If the artist exists, use the existing ID
            artistId = existingArtist[0].id;
        } else {
            // If the artist doesn't exist, create a new artist and retrieve the generated ID
            const [result] = await database.promise().query('INSERT INTO Artists (artistName) VALUES (?)', [artistName]);
            artistId = result.insertId;
        }

        // Create the album
        const [albumResult] = await database.promise().query('INSERT INTO Albums (albumName) VALUES (?)', [albumName]);
        const albumId = albumResult.insertId;

        // Create the association between the artist and the album
        await database.promise().query('INSERT INTO Album_Artist (albumId, artistId) VALUES (?, ?)', [albumId, artistId]);

        // Create the tracks and associate them with the album
        for (const track of tracks) {
            await database.promise().query('INSERT INTO Tracks (trackName) VALUES (?)', [track.trackName]);
            const [trackResult] = await database.promise().query('SELECT LAST_INSERT_ID() as trackId');
            const trackId = trackResult[0].trackId;

            // Associate the track with the album
            await database.promise().query('INSERT INTO Track_Album (trackId, albumId) VALUES (?, ?)', [trackId, albumId]);
        }

        res.status(201).json({ message: 'Album created successfully' });
    } catch (error) {
        console.error('Error creating album:', error);
        res.status(500).json({ error: 'An error occurred while creating the album' });
    }
});

export default createAlbum;
