import { Request, Response } from 'express';
import axios from 'axios';
import { API_BASE_URL } from '../config/index'

// TODO: add type objects to the API. Ex.: Club, Player, etc.

// TODO: if needed, add endpoint to get last playoff and league matches for the club. 
//See the endpoints at Postman -> EAFC 25 Clubs folder.

/**
 * Endpoint that returns club information bu searching for clubId
 * @param req must have clubId in the parameters
 * @param res 
 */
export const getClubInfo = async (req: Request, res: Response) => {
  try {
    const clubId = req.params.clubId;
    
    const requestHeaders = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      "ngrok-skip-browser-warning": "69420",
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
    };
  
    const requestParameters = `?platform=common-gen5&clubIds=${clubId}`
    
    const firstEndpointUrl = `${API_BASE_URL}/clubs/info${requestParameters}`;
    const firstEndpointResponse = await axios.get(firstEndpointUrl, { headers: requestHeaders });
    const {
      name: clubName,
      regionId,
      teamId,
    } = firstEndpointResponse.data[clubId];

    const secondEndpointUrl = `${API_BASE_URL}/clubs/overallStats${requestParameters}`;
    const secondEndpointResponse = await axios.get(secondEndpointUrl, { headers: requestHeaders });
    const {
      clubId: id,
      bestDivision,
      gamesPlayed,
      leagueAppearances,
      gamesPlayedPlayoff,
      goals,
      goalsAgainst,
      promotions,
      relegations,
      wins,
      losses,
      ties,
      wstreak: winStreak,
      skillRating,
    } = secondEndpointResponse.data[0];

    const filteredData = {
      id,
      name: clubName,
      teamId,
      regionId,
      bestDivision,
      gamesPlayed,
      leagueAppearances,
      gamesPlayedPlayoff,
      goals,
      goalsAgainst,
      promotions,
      relegations,
      wins,
      losses,
      ties,
      winStreak,
      skillRating,
    };

    res.status(200).json(filteredData);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const getClubInfoByName = async (req: Request, res: Response) => {
  try {
    const clubName = req.params.clubName;
    
    const requestHeaders = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      "ngrok-skip-browser-warning": "69420",
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
    };
  
    const requestParameters = `?platform=common-gen5&clubName=${clubName}`
    
    const endpointUrl = `${API_BASE_URL}/allTimeLeaderboard/search${requestParameters}`;
    const clubsResponse = await axios.get(endpointUrl, { headers: requestHeaders });

    console.log("clubsResponse.data = ", clubsResponse.data)

    const filteredData = clubsResponse.data.map((club: any) => ({
      clubId: club.clubId,
      name: club.clubInfo.name,
      regionId: club.clubInfo.regionId,
      teamId: club.clubInfo.teamId,
      platform: club.platform,
    }));

    res.status(200).json(filteredData);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

/**
 * Endpoint that returns club players information as well as number of players by position in the club
 * @param req must have clubId in the parameters
 * @param res 
 */
export const getClubPlayersInfo = async (req: Request, res: Response) => {
  try {
    const clubId = req.params.clubId;
    
    const requestHeaders = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      "ngrok-skip-browser-warning": "69420",
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
    };
  
    const requestParameters = `?platform=common-gen5&clubId=${clubId}`
    
    const endpointUrl = `${API_BASE_URL}/members/stats${requestParameters}`;
    const clubPlayersInfoResponse = await axios.get(endpointUrl, { headers: requestHeaders });

    res.status(200).json(clubPlayersInfoResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const getPlayerInfo = async (req: Request, res: Response) => {
  try {
    const { clubId, playerName } = req.params;
    
    const requestHeaders = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      "ngrok-skip-browser-warning": "69420",
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
    };
  
    const requestParameters = `?platform=common-gen5&clubId=${clubId}`;
    
    const endpointUrl = `${API_BASE_URL}/members/stats${requestParameters}`;
    const clubPlayersInfoResponse = await axios.get(endpointUrl, { headers: requestHeaders });

    const playerInfo = clubPlayersInfoResponse.data.members.find((player: { name: string }) => player.name == playerName);
    console.log("playerInfo = ", playerInfo);

    res.status(200).json(playerInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};