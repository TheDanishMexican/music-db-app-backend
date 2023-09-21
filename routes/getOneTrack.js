"use strict";

import database from "../database.js";
import express from 'express';

const oneTrack = express.Router();

oneTrack.get('/tracks/:id', (request, response) => {
    const id = request.params.id;
    const query = 'SELECT * FROM tracks where track_id=?;';
    const values = [id];

    database.query(query, values, (error, results, fields) => {
        if (error) {
            console.log(error);
            response.json({message: error});
        } else {
            response.json(results[0]);
        }
    });
});

export default oneTrack;
