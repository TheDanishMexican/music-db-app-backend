"use strict";

import express from 'express';
import database from '../database.js';

const createAlbum = express.Router();

// Ændre din kode til at tage højde for artistId
createAlbum.post('/albums', async (req, res) => {
    try {
        const { albumName, artistName } = req.body;

        // Check if the artist exists in the database
        const [existingArtist] = await database.promise().query('SELECT artist_id FROM Artists WHERE artist_name = ?', [artistName]);

        let artistId;

        if (existingArtist && existingArtist.length > 0) {
            // If the artist exists, use the existing ID
            artistId = existingArtist[0].artist_id;
        } else {
            // If the artist doesn't exist, create a new artist and retrieve the generated ID
            const [result] = await database.promise().query('INSERT INTO Artists (artist_name) VALUES (?)', [artistName]);
            artistId = result.insertId;
        }

        // Check if the album with the same name already exists for the artist
        const [existingAlbum] = await database.promise().query('SELECT album_id FROM albums WHERE album_name = ? AND artist_id = ?', [albumName, artistId]);

        if (existingAlbum && existingAlbum.length > 0) {
            // If the album already exists for the artist, return an error
            res.status(400).json({ error: 'Album with the same name already exists for the artist' });
        } else {
            // Create the album by specifying the artistId
            const [albumResult] = await database.promise().query('INSERT INTO albums (album_name, artist_id) VALUES (?, ?)', [albumName, artistId]);
            res.status(201).json({ message: 'Album created successfully' });
        }
    } catch (error) {
        console.error('Error creating album:', error);
        res.status(500).json({ error: 'An error occurred while creating the album' });
    }
});

export default createAlbum;
