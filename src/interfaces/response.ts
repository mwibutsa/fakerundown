export interface ISchedule {
  attendance: number;
  event_headline: string;
  event_name: string;
  season_type: string;
  season_year: number;
  week: number;
  week_detail: string;
  week_name: string;
}

export interface IScore {
  broadcast: string;
  display_clock: string;
  event_id: string;
  event_status: string;
  event_status_detail: string;
  game_clock: number;
  game_period: number;
  score_away: number;
  score_home: number;
  venue_location: string;
  venue_name: string;
  winner_away: number;
  winner_home: number;
}

export interface ITeam {
  is_away: boolean;
  is_home: boolean;
  name: string;
  team_id: number;
  team_normalized_id: number;
}

export interface ITeamsNormalized {
  abbreviation: string;
  is_away: boolean;
  is_home: boolean;
  mascot: string;
  name: string;
  ranking: number;
  record: string;
  team_id: number;
}

export interface IEvent {
  event_date: Date | string;
  event_id: string;
  event_uuid: string;
  rotation_number_away: number;
  rotation_number_home: number;
  schedule: ISchedule;
  score: IScore;
  sport_id: number;
  teams: ITeam[];
  teams_normalized: ITeamsNormalized[];
  event_name: string;
}

export interface IMeta {
  delta_last_id: string;
}

export interface IRootObject {
  events: IEvent[];
  meta: IMeta;
}
