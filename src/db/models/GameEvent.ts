import mongoose, { Schema } from 'mongoose';
import { IEvent } from '@interfaces/models';

const gameEventSchema = new Schema<IEvent>({
  event_date: { type: Date },
  event_id: { type: String },
  event_uuid: { type: String },
  rotation_number_away: { type: Number },
  rotation_number_home: { type: Number },
  schedule: {
    attendance: { type: Number },
    event_headline: { type: String },
    event_name: { type: String },
    season_type: { type: String },
    season_year: { type: Number },
    week: { type: Number },
    week_detail: { type: String },
    week_name: { type: String },
  },
  score: {
    broadcast: { type: String },
    display_clock: { type: String },
    event_id: { type: String },
    event_status: { type: String },
    event_status_detail: { type: String },
    game_clock: { type: Number },
    game_period: { type: Number },
    score_away: { type: Number },
    score_home: { type: Number },
    venue_location: { type: String },
    venue_name: { type: String },
    winner_away: { type: Number },
    winner_home: { type: Number },
  },
  sport_id: { type: Number, default: 5 },
  teams: [
    {
      is_away: { type: Boolean },
      is_home: { type: Boolean },
      name: { type: String },
      team_id: { type: Number },
      team_normalized_id: { type: Number },
    },
  ],
  teams_normalized: [
    {
      abbreviation: { type: String },
      is_away: { type: Boolean },
      is_home: { type: Boolean },
      mascot: { type: String },
      name: { type: String },
      ranking: { type: Number },
      record: { type: String },
      team_id: { type: Number },
    },
  ],
  event_name: { type: String },
});

export default mongoose.model('GameEvent', gameEventSchema);
