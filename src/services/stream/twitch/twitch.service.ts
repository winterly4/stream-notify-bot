import ConfigService from "../../../core/config.service";
import { OAuth2Service } from "../../oauth2/oauth2.service";

export class TwitchService implements ITwitchService {
  constructor(private oauth2Service: IOAuth2Service, private clientId: string = ) {}
  getStreamInfoByLogin(channel: string): Promise<StreamsUserResponse | null> {}
  getStreamLiveChannel() {
    
  }
}
