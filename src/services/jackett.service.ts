import * as request from 'request-promise';

import { JackettIndexerDetails, JackettResponse, JackettResult } from '../responses/jackett.response';

import { xml2js } from 'xml-js';

export class JackettService {
  public Categories = {
    Console: 1000,
    ConsoleWii: 1030,
    ConsoleXBox: 1040,
    ConsoleXBox360: 1050,
    ConsolePS3: 1080,
    ConsoleOther: 1090,
    ConsolePS4: 1180,
    Movies: 2000,
    MoviesOther: 2020,
    MoviesSD: 2030,
    MoviesHD: 2040,
    Movies3D: 2050,
    MoviesBluRay: 2060,
    MoviesDVD: 2070,
    Audio: 3000,
    AudioMP3: 3010,
    AudioVideo: 3020,
    AudioAudiobook: 3030,
    AudioLossless: 3040,
    AudioOther: 2050,
    PC: 4000,
    PCISO: 4020,
    PCMac: 4030,
    PCPhoneOther: 4040,
    PCGames: 4050,
    PCPhoneIOS: 4060,
    PCPhoneAndroid: 4070,
    TV: 5000,
    TVSD: 5030,
    TVHD: 5040,
    TVOther: 5050,
    XXX: 6000,
    XXXDVD: 6010,
    XXXOther: 6050,
    XXXImageset: 6060,
    Other: 7000,
    Books: 8000,
    BooksEBook: 8010,
    BooksComics: 8020,
    BooksOther: 8050,
  };

  constructor(private host: string, private apiKey: string) {}

  /**
   * search
   * @param {string} query Search string
   * @param {number[]} categories Categories to include
   */
  public async search(query: string, categories?: number[]): Promise<JackettResponse> {
    const url =
      `${this.host}/api/v2.0/indexers/all/results?apikey=${this.apiKey}&Query=${encodeURIComponent(query)}` +
      `${categories ? '&Category[]=' + categories.join('&Category[]=') : ''}`;

    return request({
      url,
      json: true,
    }).then(json => json);
  }

  /**
   * searchRSS
   * @param {string} query Search string
   * @param {string} indexer Indexer to search
   * @param {number[]} categories Categories to include
   */
  public async searchRSS(query: string, indexer: string = 'all', categories?: number[]): Promise<JackettResult[]> {
    const url =
      `${this.host}/api/v2.0/indexers/${indexer}/results/torznab/api?apikey=${this.apiKey}&t=search` +
      `&q=${encodeURIComponent(query)}` +
      `${categories ? '&cat=' + categories.join(',') : ''}`;

    return request(url)
      .then(xml => xml2js(xml, { compact: true, nativeType: true }))
      .then((json: any) => {
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
            Category: Array.isArray(item.category) && item.category.map(category => category._text),
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
      });
  }

  /**
   * getIndexers
   * @param {boolean} configured Only get configured indexers
   */
  public async getIndexers(configured: boolean = true): Promise<JackettIndexerDetails[]> {
    return request(
      `${this.host}/api/v2.0/indexers/all/results/torznab/api?apikey=${
        this.apiKey
      }&t=indexers&configured=${configured}`,
    )
      .then(xml => xml2js(xml, { compact: true, nativeType: true }))
      .then((json: any) => {
        return json.indexers.indexer.map(indexer => {
          const searching = indexer.caps.searching;
          return {
            ID: indexer._attributes.id,
            Configured: indexer._attributes.configured,
            Title: indexer.title._text,
            Description: indexer.description._text,
            Link: indexer.link._text,
            Language: indexer.language._text,
            Type: indexer.type._text,
            Categories: [].concat(indexer.caps.categories.category).map(category => {
              return {
                ID: category._attributes.id,
                Name: category._attributes.name,
              };
            }),
            Searching: {
              Search: {
                Available: searching.search._attributes.available,
                SupportedParams: searching.search._attributes.supportedParams,
              },
              TvSearch: {
                Available: searching['tv-search']._attributes.available,
                SupportedParams: searching['tv-search']._attributes.supportedParams,
              },
              MovieSearch: {
                Available: searching['movie-search']._attributes.available,
                SupportedParams: searching['movie-search']._attributes.supportedParams,
              },
              MusicSearch: {
                Available: searching['music-search']._attributes.available,
                SupportedParams: searching['music-search']._attributes.supportedParams,
              },
              AudioSearch: {
                Available: searching['audio-search']._attributes.available,
                SupportedParams: searching['audio-search']._attributes.supportedParams,
              },
            },
          };
        });
      });
  }
}
