export interface GenerateResponse {
  hooks: string[];
  titles: string[];
  script: string;
}

export interface GenerateRequest {
  topic: string;
}
