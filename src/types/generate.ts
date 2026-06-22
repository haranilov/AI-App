/** Generated hooks, titles, and script for a video topic. */
export interface GenerateResponse {
  hooks: string[];
  titles: string[];
  script: string;
}

/** Request payload for hook generation. */
export interface GenerateRequest {
  topic: string;
}
