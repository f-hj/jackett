export interface JackettIndexer {
  ID: string;
  Name: string;
  Status: number;
  Results: number;
  Error?: string;
}

interface SearchType {
  Available: string;
  SupportedParams: string;
}

export interface JackettIndexerDetails {
  ID: string;
  Configured: boolean;
  Title: string;
  Description: string;
  Link: string;
  Language: string;
  Type: 'public' | 'private' | 'semi-private';
  Categories: [JackettIndexerDetailsCategory];
  Searching: [JackettIndexerDetailsSearching];
}

interface JackettIndexerDetailsCategory {
  ID: number;
  Name: string;
}

interface JackettIndexerDetailsSearching {
  Search: SearchType;
  TvSearch: SearchType;
  MovieSearch: SearchType;
  MusicSearch: SearchType;
  AudioSearch: SearchType;
}

export interface JackettResult {
  FirstSeen: Date;
  Tracker: string;
  TrackerId: string;
  CategoryDesc: string;
  BlackholeLink?: any;
  Title: string;
  Guid: string;
  Link?: any;
  Comments: string;
  PublishDate: Date;
  Category: number[];
  Size: number;
  Files?: any;
  Grabs?: any;
  Description?: any;
  RageID: number;
  TVDBId: number;
  Imdb: number;
  TMDb: number;
  Seeders: number;
  Peers: number;
  BannerUrl?: any;
  InfoHash: string;
  MagnetUri: string;
  MinimumRatio?: any;
  MinimumSeedTime?: any;
  DownloadVolumeFactor: number;
  UploadVolumeFactor: number;
  Gain: number;
}

export interface JackettResponse {
  Results: JackettResult[];
  Indexers: JackettIndexer[];
}

export interface JackettFilteringParams {
  offset?: number;
  limit?: number;
  ep?: number;
  season?: number;
}
