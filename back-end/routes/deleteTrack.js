import express from 'express';
import database from '../database.js';

const deleteTrack = express.Router();

deleteTrack.delete('/tracks/:track_id', (request, response) => {
    const trackIdToDelete = request.params.track_id;
    const deleteTrackArtistQuery = 'DELETE FROM track_artist WHERE track_id = ?';

    database.query(deleteTrackArtistQuery, [trackIdToDelete], (error, results, fields) => {
        if (error) {
            console.log(error);
            response.json({ message: error });
        } else {
            const deleteTrackAlbumQuery = 'DELETE FROM track_album WHERE track_id = ?';

            database.query(deleteTrackAlbumQuery, [trackIdToDelete], (error, results, fields) => {
                if (error) {
                    console.log(error);
                    response.json({ message: error });
                } else {
                    const deleteTrackQuery = 'DELETE FROM tracks WHERE track_id = ?';

                    database.query(deleteTrackQuery, [trackIdToDelete], (error, results, fields) => {
                        if (error) {
                            console.log(error);
                            response.json({ message: error });
                        } else {
                            response.json({ message: 'Track deleted successfully' });
                        }
                    });
                }
            });
        }
    });
});

export default deleteTrack;
