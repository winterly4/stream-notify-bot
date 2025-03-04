export interface IOAuth2Service {
  getAccessToken(): Promise<string>;
  refreshToken(): Promise<void>;
}

export class OAuth2Service {
  constructor(
    private clientId: string,
    private clientSecret: string,
    private accessTokenURL: string
  ) {}

  async getToken() {
    return;
    const params = new URLSearchParams({
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: "client_credentials",
    });

    try {
      const response = await fetch(this.accessTokenURL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
      });

      if (!response.ok) throw new Error(`Ошибка запроса ${response.status}`);

      const data = await response.json();

      if (data !== null) {
        return data.access_token;
      }
    } catch (error) {
      console.error("Ошибка при получении токена", error);
    }
  }
}
