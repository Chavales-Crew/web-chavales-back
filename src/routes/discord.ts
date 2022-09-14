import express, { Request, Response } from 'express';
import axios from 'axios';

import { URLSearchParams } from 'url';

const router = express.Router();

const handleDiscordLogin = (req: Request, res: Response) => {
  const { code } = req.query;

  if (!code) {
    res.status(400).send('Missing code');
    return;
  }

  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID,
    client_secret: process.env.DISCORD_CLIENT_SECRET,
    grant_type: 'authorization_code',
    code: code as string,
    redirect_uri: 'http://localhost:3001/discord',
    scope: 'identify email guilds',
  });

  axios
    .post('https://discord.com/api/oauth2/token', params.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

// TODO: Rename this to a proper name
const handleDiscordUser = (req: Request, res: Response) => {
  const { access_token, token_type } = req.query;

  if (!access_token) {
    res.status(400).send('Missing access_token');
    return;
  }

  if (!token_type) {
    res.status(400).send('Missing token_type');
    return;
  }

  axios
    .get('https://discord.com/api/users/@me', {
      headers: {
        authorization: `${token_type} ${access_token}`,
      },
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

router.get('/login', [], handleDiscordLogin);
router.get('/user', [], handleDiscordUser);

export { router as discordRouter };