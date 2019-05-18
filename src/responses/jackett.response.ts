export interface JackettIndexer {
  ID: string;
  Name: string;
  Status: number;
  Results: number;
  Error?: string;
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
