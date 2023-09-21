"use strict";

import database from "../database.js";
import express from 'express';

const frontPage = express.Router();

//Get all tracks
frontPage.get('/', (request, response) => {
response.send('Hello welcome Sir')
});

export default frontPage;