import * as request from 'request-promise';

import {JackettIndexerDetails, JackettResponse} from '../responses/jackett.response';

import {xml2js} from 'xml-js';

export class JackettService {
  constructor(private host: string, private apiKey: string) {}

  public async search(query: string, categories?: number[]): Promise<JackettResponse> {
    const url =
      `${this.host}/api/v2.0/indexers/all/results?apikey=${this.apiKey}&Query=${encodeURIComponent(query)}` +
      `${categories ? '&Category[]=' + categories.join('&Category[]=') : ''}`;

    return request({
      url,
      json: true,
    }).then(json => json);
  }
  public async getIndexers(configured: boolean = true): Promise<JackettIndexerDetails[]> {
    return request({
      url: `${this.host}/api/v2.0/indexers/all/results/torznab/api?apikey=${this.apiKey}&t=indexers&configured=${configured}`,
    }).then(xml => xml2js(xml, {compact: true, nativeType: true})).then(json => {
      // @ts-ignore
      return json.indexers.indexer.map(indexer => {
        const searching = indexer.caps.searching;
        return {
          id: indexer._attributes.id,
          configured: indexer._attributes.configured,
          title: indexer.title._text,
          description: indexer.description._text,
          link: indexer.link._text,
          language: indexer.language._text,
          type: indexer.type._text,
          categories: [].concat(indexer.caps.categories.category).map(category => category._attributes),
          searching: {
            search: {
              available: searching.search._attributes.available,
              supportedParams: searching.search._attributes.supportedParams,
            },
            tvSearch: {
              available: searching['tv-search']._attributes.available,
              supportedParams: searching['tv-search']._attributes.supportedParams,
            },
            movieSearch: {
              available: searching['movie-search']._attributes.available,
              supportedParams: searching['movie-search']._attributes.supportedParams,
            },
            musicSearch: {
              available: searching['music-search']._attributes.available,
              supportedParams: searching['music-search']._attributes.supportedParams,
            },
            audioSearch: {
              available: searching['audio-search']._attributes.available,
              supportedParams: searching['audio-search']._attributes.supportedParams,
            },
          },
        };
      });
    });
  }
}
