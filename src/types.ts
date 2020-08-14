export interface Film {
  'id': number,
  'name': string,
  'poster_image': string,
  'preview_image': string,
  'background_image': string,
  'background_color': string,
  'description': string,
  'rating': number,
  'scores_count': number,
  'director': string,
  'starring': Array<string>,
  'run_time': number,
  'genre': string,
  'released': number,
  'is_favorite': boolean,
  'video_link': string,
  'preview_video_link': string
}

export interface Review {
  id: number,
  user: {
    id: number,
    name: string,
  },
  rating: number,
  comment: string,
  date: string,
}

export enum Status {
  PENDING = `pending`,
  SUCCESS = `success`,
  ERROR = `error`,
}

export enum AuthorizationStatus {
  AUTH = `AUTH`,
  NO_AUTH = `NO_AUTH`,
}

export enum TabsEnum {
  OVERVIEW = `overview`,
  DETAILS = `details`,
  REVIEWS = `reviews`,
}

