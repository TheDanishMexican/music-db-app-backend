import express from 'express';
import database from '../database.js';

const deleteAlbum = express.Router();

deleteAlbum.delete('/albums/:album_id', (request, response) => {
    const albumIdToDelete = request.params.album_id;

    // Step 1: Delete references in the track_artist table
    const deleteTrackArtistQuery = 'DELETE FROM track_artist WHERE track_id IN (SELECT track_id FROM tracks WHERE album_id = ?)';
    database.query(deleteTrackArtistQuery, [albumIdToDelete], (error, results, fields) => {
        if (error) {
            console.log(error);
            response.json({ message: error });
        } else {
            // Step 2: Delete references in the track_album table
            const deleteTrackAlbumQuery = 'DELETE FROM track_album WHERE track_id IN (SELECT track_id FROM tracks WHERE album_id = ?)';
            database.query(deleteTrackAlbumQuery, [albumIdToDelete], (error, results, fields) => {
                if (error) {
                    console.log(error);
                    response.json({ message: error });
                } else {
                    // Step 3: Delete tracks associated with the album
                    const deleteTracksQuery = 'DELETE FROM tracks WHERE album_id = ?';
                    database.query(deleteTracksQuery, [albumIdToDelete], (error, results, fields) => {
                        if (error) {
                            console.log(error);
                            response.json({ message: error });
                        } else {
                            // Step 4: Delete the album itself
                            const deleteAlbumQuery = 'DELETE FROM albums WHERE album_id = ?';
                            database.query(deleteAlbumQuery, [albumIdToDelete], (error, results, fields) => {
                                if (error) {
                                    console.log(error);
                                    response.json({ message: error });
                                } else {
                                    response.json({ message: 'Album deleted successfully' });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

export default deleteAlbum;

