"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireWildcard(require("mongoose"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const gameEventSchema = new _mongoose.Schema({
  event_date: {
    type: Date
  },
  event_id: {
    type: String
  },
  event_uuid: {
    type: String
  },
  rotation_number_away: {
    type: Number
  },
  rotation_number_home: {
    type: Number
  },
  schedule: {
    attendance: {
      type: Number
    },
    event_headline: {
      type: String
    },
    event_name: {
      type: String
    },
    season_type: {
      type: String
    },
    season_year: {
      type: Number
    },
    week: {
      type: Number
    },
    week_detail: {
      type: String
    },
    week_name: {
      type: String
    }
  },
  score: {
    broadcast: {
      type: String
    },
    display_clock: {
      type: String
    },
    event_id: {
      type: String
    },
    event_status: {
      type: String
    },
    event_status_detail: {
      type: String
    },
    game_clock: {
      type: Number
    },
    game_period: {
      type: Number
    },
    score_away: {
      type: Number
    },
    score_home: {
      type: Number
    },
    venue_location: {
      type: String
    },
    venue_name: {
      type: String
    },
    winner_away: {
      type: Number
    },
    winner_home: {
      type: Number
    }
  },
  sport_id: {
    type: Number,
    default: 5
  },
  teams: [{
    is_away: {
      type: Boolean
    },
    is_home: {
      type: Boolean
    },
    name: {
      type: String
    },
    team_id: {
      type: Number
    },
    team_normalized_id: {
      type: Number
    }
  }],
  teams_normalized: [{
    abbreviation: {
      type: String
    },
    is_away: {
      type: Boolean
    },
    is_home: {
      type: Boolean
    },
    mascot: {
      type: String
    },
    name: {
      type: String
    },
    ranking: {
      type: Number
    },
    record: {
      type: String
    },
    team_id: {
      type: Number
    }
  }],
  event_name: {
    type: String
  }
});
var _default = _mongoose.default.model('GameEvent', gameEventSchema);
exports.default = _default;