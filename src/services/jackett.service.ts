import * as request from 'request-promise';

import {JackettIndexerDetails, JackettResponse, JackettResult} from '../responses/jackett.response';

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
  public async searchRSS(query: string, indexer: string = 'all', categories?: number[]): Promise<JackettResult[]> {
      const url =
          `${this.host}/api/v2.0/indexers/${indexer}/results/torznab/api?apikey=${this.apiKey}&t=search&q=${encodeURIComponent(query)}` +
          `${categories ? '&cat=' + categories.join(',') : ''}`;
      return request(url).then(xml => xml2js(xml, {compact: true, nativeType: true})).then(((json: any) => {
        if (json.error) {
          return Promise.resolve([]);
        }
        return [].concat(json.rss.channel.item || []).map(item => {
          const torznabAttrs: any = {};
          item['torznab:attr'].forEach(attr => {
            torznabAttrs[attr._attributes.name] = attr._attributes.value;
          });
          return {
            Title: item.title._text,
            Tracker: item.jackettindexer._attributes.id,
            TrackerId: item.jackettindexer._text,
            PublishDate: item.pubDate._text,
            FirstSeen: item.pubDate._text,
            Size: item.size._text,
            Description: item.description._text,
            Guid: item.guid._text,
            Link: item.link._text,
            Comments: item.comments._text,
            Category: item.category.map(category => category._text),
            MagnetUri: torznabAttrs.magneturl,
            Imdb: torznabAttrs.imdb,
            Seeders: torznabAttrs.seeders,
            Peers: torznabAttrs.peers,
            InfoHash: torznabAttrs.infohash,
            DownloadVolumeFactor: torznabAttrs.downloadvolumefactor,
            UploadVolumeFactor: torznabAttrs.uploadvolumefactor,
            RageID: 0,
            TVDBId: 0,
            TMDb: 0,
            Gain: 0,
            CategoryDesc: '',
          };
        });
      }));
  }
  public async getIndexers(configured: boolean = true): Promise<JackettIndexerDetails[]> {
    return request({
      url: `${this.host}/api/v2.0/indexers/all/results/torznab/api?apikey=${this.apiKey}&t=indexers&configured=${configured}`,
    }).then(xml => xml2js(xml, {compact: true, nativeType: true})).then((json: any) => {
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
