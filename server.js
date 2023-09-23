import express from 'express';
import fs from 'fs/promises';
import cors from 'cors';
import allTracks from './routes/getAllTracks.js';
import oneTrack from './routes/getOneTrack.js';
import deleteTrack from './routes/deleteTrack.js';
import updateTrack from './routes/updateTrack.js';
import createTrack from './routes/createTrack.js';
import allArtists from './routes/getAllArtists.js';
import createArtist from './routes/createArtist.js';
import allAlbums from './routes/getAllAlbums.js';
import createAlbum from './routes/createAlbum.js';
import search from './routes/search.js';
import addArtistToTrack from './routes/addArtistToTrack.js';
import addTrackToAlbum from './routes/addTrackToAlbum.js';
import deleteAlbum from './routes/deleteAlbum.js';
import getUsers from './routes/getUsersTest.js';
import frontPage from './routes/frontPage.js';
import getAlbumInfo from './routes/getAlbumInfo.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/', allTracks);
app.use('/', oneTrack);
app.use('/', deleteTrack);
app.use('/', updateTrack);
app.use('/', createTrack);
app.use('/', allArtists);
app.use('/', createArtist);
app.use('/', allAlbums);
app.use('/', createAlbum);
app.use('/', search);
app.use('/', addArtistToTrack);
app.use('/', addTrackToAlbum);
app.use('/', deleteAlbum);
app.use('/', getUsers);
app.use('/', frontPage);
app.use('/', getAlbumInfo);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
    console.log(`Tracks Endpoint http://localhost:${port}/tracks`);
});