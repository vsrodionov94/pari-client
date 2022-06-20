import {
  CheckUserRequest,
  CheckUserResponse,
  GetRaitingsRequest,
  GetRaitingsResponse,
  SetTeamRequest,
  SetTeamResponse,
  TryHittingRequest,
  TryHittingResponse,
} from "../types";


class Api {
  private url: string;
  private headers: { "Content-type": string; };

  constructor(config: { url: string, headers: { "Content-type": string } }) {
    this.url = config.url;
    this.headers = config.headers;
  }

  private handleResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  public checkUser(data: CheckUserRequest): Promise<CheckUserResponse> {
    return fetch(`${this.url}/checkUser`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify(data),
    }).then(this.handleResponseData);
  }

  public getRaitings(data: GetRaitingsRequest): Promise<GetRaitingsResponse> {
    return fetch(`${this.url}/getRaitings`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify(data),
    }).then(this.handleResponseData);
  }

  public tryHitting(data: TryHittingRequest): Promise<TryHittingResponse> {
    return fetch(`${this.url}/tryHitting`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify(data),
    }).then(this.handleResponseData);
  }

  public setTeam(data: SetTeamRequest): Promise<SetTeamResponse> {
    return fetch(`${this.url}/setTeam`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify(data),
    }).then(this.handleResponseData);
  }
}

const api = new Api({
  url: process.env.API,
  headers: {
    "Content-type": "application/json",
  },
});

export default api;