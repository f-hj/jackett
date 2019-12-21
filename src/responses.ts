export interface Indexer {
  ID: string
  Name: string
  Status: number
  Results: number
  Error?: string
}

interface SearchType {
  Available: string
  SupportedParams: string
}

export interface IndexerDetails {
  ID: string
  Configured: boolean
  Title: string
  Description: string
  Link: string
  Language: string
  Type: IndexerDetailsType
  Categories: IndexerDetailsCategory[]
  Searching: IndexerDetailsSearching[]
}

enum IndexerDetailsType {
  Public = "public",
  Private = "private",
  SemiPrivate = "semi-private",
}

interface IndexerDetailsCategory {
  ID: number
  Name: string
}

interface IndexerDetailsSearching {
  Search: SearchType
  TvSearch: SearchType
  MovieSearch: SearchType
  MusicSearch: SearchType
  AudioSearch: SearchType
}

export interface Result {
  FirstSeen: Date
  Tracker: string
  TrackerId: string
  CategoryDesc: string
  BlackholeLink?: any
  Title: string
  Guid: string
  Link?: any
  Comments: string
  PublishDate: Date
  Category: number[]
  Size: number
  Files?: any
  Grabs?: any
  Description?: any
  RageID: number
  TVDBId: number
  Imdb: number
  TMDb: number
  Seeders: number
  Peers: number
  BannerUrl?: any
  InfoHash: string
  MagnetUri: string
  MinimumRatio?: any
  MinimumSeedTime?: any
  DownloadVolumeFactor: number
  UploadVolumeFactor: number
  Gain: number
}

export interface Responses {
  Results: Result[]
  Indexers: Indexer[]
}

export interface FilteringParams {
  offset?: number
  limit?: number
  ep?: number
  season?: number
}

export interface Category {
  ID: number
  Name: string
  SubCategories?: Category[]
}
