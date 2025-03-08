export interface StreamInfo {
  id: string;
  user_id: string;
  user_login: string;
  user_name: string;
  game_id: string;
  game_name: string;
  type: string;
  title: string;
  tags: string[];
  viewer_count: number;
  started_at: string;
  language: string;
  thumbnail_url: string;
  tag_ids: string[];
  is_mature: boolean;
}

export interface StreamsUserResponse {
  data: StreamInfo[];
  pagination: {
    cursor?: string;
  };
}

export interface ITwitchService {
  getStreamInfoByChannel(channel: string): Promise<StreamsUserResponse | null>;
  getStreamLiveChannel(): Promise<StreamsUserResponse | null>;
}
