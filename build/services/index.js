"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateTeam = exports.generateScore = exports.generateSchedule = exports.generateNormalizedTeam = exports.generateEvent = void 0;
var _models = require("../db/models");
var _faker = require("@faker-js/faker");
var _moment = _interopRequireDefault(require("moment"));
var _nodeSchedule = _interopRequireDefault(require("node-schedule"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const generateTeam = (is_away = _faker.faker.datatype.boolean()) => ({
  is_away,
  get is_home() {
    return !this.is_away;
  },
  name: _faker.faker.name.fullName(),
  team_id: _faker.faker.datatype.number({
    min: 1000,
    max: 999999
  }),
  team_normalized_id: _faker.faker.datatype.number({
    min: 100,
    max: 9999
  })
});
exports.generateTeam = generateTeam;
const generateNormalizedTeam = (team = generateTeam()) => {
  return {
    ...team,
    mascot: `${_faker.faker.datatype.number({
      min: 1,
      max: 100
    })}ers`,
    get team_id() {
      return this.team_normalized_id;
    },
    ranking: _faker.faker.datatype.number({
      min: 1,
      max: 20
    }),
    record: `${_faker.faker.datatype.number({
      min: 10,
      max: 15
    })}-${_faker.faker.datatype.number({
      min: 4,
      max: 9
    })}`,
    get abbreviation() {
      return `${this.name.slice(0, 2)}`;
    }
  };
};

//const eventStatus = ['STATUS_SCHEDULED', 'STATUS_IN_PROGRESS', 'STATUS_FINAL'];
exports.generateNormalizedTeam = generateNormalizedTeam;
const generateScore = () => {
  return {
    broadcast: 'FOX',
    display_clock: `${_faker.faker.datatype.number({
      min: 0,
      max: 60
    })}:${_faker.faker.datatype.number({
      min: 0,
      max: 59
    })}`,
    event_id: _faker.faker.database.mongodbObjectId(),
    event_status: 'STATUS_SCHEDULED',
    event_status_detail: 'Upcoming',
    venue_location: `${_faker.faker.address.cityName()}, ${_faker.faker.address.stateAbbr()}`,
    game_clock: _faker.faker.datatype.number({
      min: 0,
      max: 12
    }),
    game_period: _faker.faker.datatype.number({
      min: 1,
      max: 4
    }),
    score_away: _faker.faker.datatype.number({
      min: 10,
      max: 120
    }),
    get score_home() {
      const number = _faker.faker.datatype.number({
        min: 0,
        max: 10
      });
      return number % 2 ? _faker.faker.datatype.number({
        min: 0,
        max: this.score_away - 1
      }) : _faker.faker.datatype.number({
        min: this.score_away + 1,
        max: 121
      });
    },
    venue_name: `${_faker.faker.address.streetAddress()} Stadium`,
    get winner_away() {
      return +(this.score_away > this.score_home);
    },
    get winner_home() {
      return +(this.score_home > this.score_away);
    }
  };
};
exports.generateScore = generateScore;
const generateSchedule = () => {
  return {
    attendance: _faker.faker.datatype.number({
      min: 0,
      max: 999999
    }),
    event_headline: `${_faker.faker.random.words(2)}`,
    get event_name() {
      return `${this.event_headline} at ${_faker.faker.address.streetAddress()} ${(0, _moment.default)().format('YYYY-MMM-Do')}`;
    },
    season_type: 'Postseason',
    season_year: new Date().getFullYear(),
    week: _faker.faker.datatype.number({
      min: 1,
      max: 52
    }),
    get week_detail() {
      const soon = _faker.faker.date.soon();
      const future = _faker.faker.date.future(0, soon);
      const range = _faker.faker.date.betweens(soon, future);
      return `${(0, _moment.default)(range[0]).format('MMM Do')} - ${(0, _moment.default)(range.at(-1)).format('MMM Do')}`;
    },
    // week_detail:"Jan 29-Feb 4"
    week_name: _faker.faker.date.weekday()
  };
};
exports.generateSchedule = generateSchedule;
const generateEvent = () => {
  const event = {
    event_date: new Date(new Date().setMinutes(new Date().getMinutes() + Number(process.env.KICKOFF_OFFSET_MINUTES || '5'))).toISOString(),
    event_id: _faker.faker.database.mongodbObjectId(),
    event_uuid: _faker.faker.datatype.uuid(),
    rotation_number_away: 0,
    rotation_number_home: 0,
    schedule: generateSchedule(),
    score: generateScore(),
    sport_id: 1,
    teams: [generateTeam(true), generateTeam(false)],
    get teams_normalized() {
      return [generateNormalizedTeam(this.teams[0]), generateNormalizedTeam(this.teams[1])];
    },
    get event_name() {
      return this.schedule.event_name;
    }
  };
  _nodeSchedule.default.scheduleJob(event.event_date, async () => {
    await _models.GameEventModel.findOneAndUpdate({
      event_id: event.event_id,
      event_uuid: event.event_uuid
    }, {
      $set: {
        'score.event_status': 'STATUS_IN_PROGRESS',
        'score.event_status_detail': 'Live'
      }
    });
  });
  _nodeSchedule.default.scheduleJob(new Date(new Date(event.event_date).setMinutes(new Date(event.event_date).getMinutes() + Number(process.env.GAME_TIMEOUT || 5))), async () => {
    await _models.GameEventModel.findOneAndUpdate({
      event_id: event.event_id,
      event_uuid: event.event_uuid
    }, {
      $set: {
        'score.event_status': 'STATUS_FINAL',
        'score.event_status_detail': 'Final'
      }
    });
  });
  return event;
};
exports.generateEvent = generateEvent;