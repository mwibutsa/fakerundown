import { Router } from 'express';
import userRouter from './user/user.routes';
import { GameController } from './games/games.controller';
import requestWrapper from '@middleware/requestWrapper';

const router = Router();
router.get('/generate-games', requestWrapper(GameController.generateGames));
router.get('/get-games/:date', requestWrapper(GameController.getGames));
router.use('/users', userRouter);

export default router;
