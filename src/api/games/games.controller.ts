import { generateEvent } from '@services';
import { GameEventModel } from '@models';
import jsonResponse from '@utils/jsonResponse';
import { Response, Request } from 'express';

export class GameController {
  static async generateGames(req: Request, res: Response): Promise<Response> {
    const games = Array.from({ length: 10 }, generateEvent);

    await GameEventModel.insertMany(games);

    return jsonResponse({ res, message: 'Games loaded', data: games });
  }

  static async getGames(req: Request, res: Response): Promise<Response> {
    const games = await GameEventModel.find({
      $and: [
        {
          event_date: {
            $gte: new Date(new Date(req.params.date).setHours(0, 0, 0)),
          },
        },
        {
          event_date: {
            $lte: new Date(new Date(req.params.date).setHours(23, 59, 59)),
          },
        },
      ],
    });
    return jsonResponse({ res, message: 'Games loaded', events: games });
  }
}
