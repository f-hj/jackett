export interface JackettIndexer {
  ID: string;
  Name: string;
  Status: number;
  Results: number;
  Error?: string;
}

interface SearchType {
  available: string;
  supportedParams: string;
}
export interface JackettIndexerDetails {
  id: string;
  configured: boolean;
  title: string;
  description: string;
  link: string;
  language: string;
  type: 'public' | 'private' | 'semi-private';
  categories: [
    {
      id: number;
      name: string;
    }
  ];
  searching: [
    {
      search: SearchType;
      tvSearch: SearchType;
      movieSearch: SearchType;
      musicSearch: SearchType;
      audioSearch: SearchType;
    }
  ];
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
