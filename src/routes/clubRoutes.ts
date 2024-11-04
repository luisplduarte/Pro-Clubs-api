import express from 'express';
import { getClubInfo, getClubInfoByName, getClubPlayersInfo, getPlayerInfo } from '../controllers/clubController';

const router = express.Router();

router.get('/clubs/:clubId', getClubInfo);
router.get('/clubs/:clubId/players', getClubPlayersInfo);
router.get('/clubs/:clubId/players/:playerName', getPlayerInfo);
router.get('/clubs/name/:clubName', getClubInfoByName);

export default router;
