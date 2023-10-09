"use strict";

import database from "../database.js";
import express from 'express';

const allAlbums = express.Router();

allAlbums.get('/albums', (request, response) => {
    const query = `
            SELECT album_id, album_name
            FROM albums;
        `
    database.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
            response.json({ message: error });
        } else {
            response.json(results);
        }
    });
});

export default allAlbums;