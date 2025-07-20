export interface GameDetails {
  id: number;
  name: string;
  description_raw: string;
  background_image: string;
  released: string;
  website: string;
  metacritic?: number; // Pode ser opcional
  publishers: { name: string }[];
  ratings: {
    id: number;
    title: string;
    count: number;
    percent: number;
  }[];
  platforms: {
    platform: {
      id: number;
      name: string;
      slug: string;
    };
    requirements?: {
      minimum?: string;
      recommended?: string;
    };
  }[];
  genres: { id: number; name: string; slug: string }[];
  tags: { id: number; name: string; slug: string }[];
  short_screenshots: { id: number; image: string }[];
  movies: {
    id: number;
    name: string;
    preview: string;
    data: { 480: string; max: string };
  }[];
  stores: {
    id: number;
    url: string;
    store: { id: number; name: string; slug: string };
  }[];
  series: {
    id: number;
    name: string;
    background_image: string;
    slug: string;
  }[];
}
