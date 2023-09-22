import express from 'express';
import database from '../database.js';

const createAlbum = express.Router();

createAlbum.post('/albums', async (req, res) => {
    try {
        const { albumName, artistName, tracks } = req.body;

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
            // If the album already exists for the artist, add the new tracks if they don't exist
            const albumId = existingAlbum[0].album_id;

            for (const track of tracks) {
                const [existingTrack] = await database.promise().query('SELECT track_id FROM tracks WHERE track_name = ? AND album_id = ? AND artist_id = ?', [track.trackName, albumId, artistId]);

                if (!existingTrack || existingTrack.length === 0) {
                    // If the track doesn't exist, create it and associate it with the album and artist
                    await database.promise().query('INSERT INTO tracks (track_name, album_id, artist_id) VALUES (?, ?, ?)', [track.trackName, albumId, artistId]);
                }
            }

            res.status(200).json({ message: 'Album and tracks added successfully' });
        } else {
            // If the album doesn't exist, create it along with the new tracks
            const [albumResult] = await database.promise().query('INSERT INTO albums (album_name, artist_id) VALUES (?, ?)', [albumName, artistId]);
            const albumId = albumResult.insertId;

            for (const track of tracks) {
                await database.promise().query('INSERT INTO tracks (track_name, album_id, artist_id) VALUES (?, ?, ?)', [track.trackName, albumId, artistId]);
            }

            res.status(201).json({ message: 'Album created successfully' });
        }
    } catch (error) {
        console.error('Error creating album:', error);
        res.status(500).json({ error: 'An error occurred while creating the album' });
    }
});

export default createAlbum;
