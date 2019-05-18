import * as request from 'request-promise';

import { JackettResponse } from '../responses/jackett.response';

export class JackettService {
  constructor(private host: string, private apiKey: string) {}

  public async search(query: string): Promise<JackettResponse> {
    return request({
      url: `${this.host}/api/v2.0/indexers/all/results?apikey=${this.apiKey}&Query=${encodeURIComponent(query)}`,
      json: true,
    }).then(json => json);
  }
}
