import { GameEventModel } from '@models/index';
import { IEvent } from './../interfaces/response';
import { IScore, ITeam } from '@interfaces/response';
import { faker } from '@faker-js/faker';
import { ISchedule, ITeamsNormalized } from '@interfaces/models';
import moment from 'moment';
import nodeSchedule from 'node-schedule';

export const generateTeam = (is_away = faker.datatype.boolean()): ITeam => ({
  is_away,
  get is_home() {
    return !this.is_away;
  },
  name: faker.name.fullName(),
  team_id: faker.datatype.number({ min: 1000, max: 999999 }),
  team_normalized_id: faker.datatype.number({ min: 100, max: 9999 }),
});

export const generateNormalizedTeam = (team: ITeam = generateTeam()): ITeamsNormalized & ITeam => {
  return {
    ...team,
    mascot: `${faker.datatype.number({ min: 1, max: 100 })}ers`,
    get team_id() {
      return this.team_normalized_id;
    },
    ranking: faker.datatype.number({ min: 1, max: 20 }),
    record: `${faker.datatype.number({ min: 10, max: 15 })}-${faker.datatype.number({ min: 4, max: 9 })}`,
    get abbreviation() {
      return `${this.name.slice(0, 2)}`;
    },
  };
};

//const eventStatus = ['STATUS_SCHEDULED', 'STATUS_IN_PROGRESS', 'STATUS_FINAL'];

export const generateScore = (): IScore => {
  return {
    broadcast: 'FOX',
    display_clock: `${faker.datatype.number({ min: 0, max: 60 })}:${faker.datatype.number({ min: 0, max: 59 })}`,
    event_id: faker.database.mongodbObjectId(),
    event_status: 'STATUS_SCHEDULED',
    event_status_detail: 'Upcoming',
    venue_location: `${faker.address.cityName()}, ${faker.address.stateAbbr()}`,
    game_clock: faker.datatype.number({ min: 0, max: 12 }),
    game_period: faker.datatype.number({ min: 1, max: 4 }),
    score_away: faker.datatype.number({ min: 10, max: 120 }),
    get score_home() {
      const number = faker.datatype.number({ min: 0, max: 10 });
      return number % 2
        ? faker.datatype.number({ min: 0, max: this.score_away - 1 })
        : faker.datatype.number({ min: this.score_away + 1, max: 121 });
    },
    venue_name: `${faker.address.streetAddress()} Stadium`,
    get winner_away() {
      return Number(this.score_away > this.score_home);
    },
    get winner_home() {
      return Number(this.score_home > this.score_away);
    },
  };
};

export const generateSchedule = (): ISchedule => {
  return {
    attendance: faker.datatype.number({ min: 0, max: 999999 }),
    event_headline: `${faker.random.words(2)}`,
    get event_name() {
      return `${this.event_headline} at ${faker.address.streetAddress()} ${moment().format('YYYY-MMM-Do')}`;
    },
    season_type: 'Postseason',
    season_year: new Date().getFullYear(),
    week: faker.datatype.number({ min: 1, max: 52 }),
    get week_detail() {
      const soon = faker.date.soon();
      const future = faker.date.future(0, soon);
      const range = faker.date.betweens(soon, future);
      return `${moment(range[0]).format('MMM Do')} - ${moment(range.at(-1)).format('MMM Do')}`;
    },
    // week_detail:"Jan 29-Feb 4"
    week_name: faker.date.weekday(),
  };
};

export const generateEvent = (): IEvent => {
  const now = new Date();
  const is_away = faker.datatype.boolean();
  now.setUTCHours;
  const event = {
    event_date: new Date(now.setMinutes(now.getMinutes() + faker.datatype.number({ min: 2, max: 60 }))).toISOString(),
    event_id: faker.database.mongodbObjectId(),
    event_uuid: faker.datatype.uuid(),
    rotation_number_away: 0,
    rotation_number_home: 0,
    schedule: generateSchedule(),
    sport_id: 1,
    teams: [generateTeam(is_away), generateTeam(!is_away)],
    score: generateScore(),
    get teams_normalized() {
      return [generateNormalizedTeam(this.teams[0]), generateNormalizedTeam(this.teams[1])];
    },
    get event_name() {
      return this.schedule.event_name;
    },
  };

  nodeSchedule.scheduleJob(event.event_date, async () => {
    await GameEventModel.findOneAndUpdate(
      {
        event_id: event.event_id,
        event_uuid: event.event_uuid,
      },
      {
        $set: {
          'score.event_status': 'STATUS_IN_PROGRESS',
          'score.event_status_detail': 'Live',
        },
      },
    );
  });
  nodeSchedule.scheduleJob(
    new Date(
      new Date(event.event_date).setMinutes(
        new Date(event.event_date).getMinutes() + Number(process.env.GAME_TIMEOUT || 5),
      ),
    ),
    async () => {
      await GameEventModel.findOneAndUpdate(
        {
          event_id: event.event_id,
          event_uuid: event.event_uuid,
        },
        {
          $set: {
            'score.event_status': 'STATUS_FINAL',
            'score.event_status_detail': 'Final',
          },
        },
      );
    },
  );

  return event;
};
