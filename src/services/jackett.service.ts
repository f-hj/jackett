import * as request from 'request-promise';

import { JackettResponse } from '../responses/jackett.response';

export class JackettService {
  constructor(private host: string, private apiKey: string) {}

  public async search(query: string, categories?: number[]): Promise<JackettResponse> {
    const url = `${this.host}/api/v2.0/indexers/all/results?apikey=${this.apiKey}&Query=${encodeURIComponent(query)}` +
                `${categories ? '&Category[]=' + categories.join('&Category[]=') : ''}`;
    return request({
      url,
      json: true,
    }).then(json => json);
  }
}
