export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AirportData = {
  __typename?: 'AirportData';
  airportType?: Maybe<AirportType>;
  continent?: Maybe<Scalars['String']['output']>;
  home_link?: Maybe<Scalars['String']['output']>;
  iata_code?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  ident?: Maybe<Scalars['String']['output']>;
  iso_country?: Maybe<Scalars['String']['output']>;
  iso_region?: Maybe<Scalars['String']['output']>;
  keywords?: Maybe<Scalars['String']['output']>;
  local_code?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Location>;
  municipality?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  scheduled_service?: Maybe<Scalars['String']['output']>;
  wikipedia_link?: Maybe<Scalars['String']['output']>;
};

export type AirportInput = {
  airportType?: InputMaybe<AirportType>;
  continent?: InputMaybe<Scalars['String']['input']>;
  home_link?: InputMaybe<Scalars['String']['input']>;
  iata_code?: InputMaybe<Scalars['String']['input']>;
  ident?: InputMaybe<Scalars['String']['input']>;
  iso_country?: InputMaybe<Scalars['String']['input']>;
  iso_region?: InputMaybe<Scalars['String']['input']>;
  keywords?: InputMaybe<Scalars['String']['input']>;
  local_code?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<LocationInput>;
  municipality?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  scheduled_service?: InputMaybe<Scalars['String']['input']>;
  wikipedia_link?: InputMaybe<Scalars['String']['input']>;
};

export enum AirportType {
  Heliport = 'HELIPORT',
  LargeAirport = 'LARGE_AIRPORT',
  MediumAirport = 'MEDIUM_AIRPORT',
  SeaplaneBase = 'SEAPLANE_BASE',
  SmallAirport = 'SMALL_AIRPORT'
}

export type Location = {
  __typename?: 'Location';
  elevation_ft?: Maybe<Scalars['Int']['output']>;
  latitude_deg?: Maybe<Scalars['Float']['output']>;
  longitude_deg?: Maybe<Scalars['Float']['output']>;
};

export type LocationInput = {
  elevation_ft?: InputMaybe<Scalars['Int']['input']>;
  latitude_deg?: InputMaybe<Scalars['Float']['input']>;
  longitude_deg?: InputMaybe<Scalars['Float']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAirport?: Maybe<AirportData>;
  deleteAirport?: Maybe<AirportData>;
  updateAirport?: Maybe<AirportData>;
};


export type MutationCreateAirportArgs = {
  airport: AirportInput;
};


export type MutationDeleteAirportArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateAirportArgs = {
  airport: AirportInput;
  id: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAirport?: Maybe<AirportData>;
  getAirportsByContinent?: Maybe<Array<Maybe<AirportData>>>;
  getAirportsByType?: Maybe<Array<Maybe<AirportData>>>;
};


export type QueryGetAirportArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetAirportsByContinentArgs = {
  continent: Scalars['String']['input'];
};


export type QueryGetAirportsByTypeArgs = {
  airportType: AirportType;
};
