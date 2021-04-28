import axios, { AxiosInstance, AxiosPromise } from "axios";
import { TicketDTO } from "../models/TicketDTO";

const ADDRESS = 'https://front-test.beta.aviasales.ru/';
const MAX_TOKEN_INIT_TIMES = 3;

export interface AviasalesTicketResponse {
  tickets: TicketDTO[],
  stop: boolean,
}

interface AviasalesSearchResponse {
  searchId: string,
}

export default class AviasalesService {
  private _axios: AxiosInstance;
  private _searchId: string = '';
  private _tokenInitTimes: number = 0;

  constructor() {
    this._axios = axios.create({
      baseURL: ADDRESS,
    });
  }

  public loadTickets(): Promise<AviasalesTicketResponse> {
    return this.getTicketsRequest()
      .then(response => {
        this._tokenInitTimes = 0;

        return {
          stop: response.data.stop,
          tickets: response.data.tickets,
        } as AviasalesTicketResponse;
      }).catch(() => {
        this._tokenInitTimes++;

        if (MAX_TOKEN_INIT_TIMES === this._tokenInitTimes) {
          console.error(`AviasalesService. Maximum ticket call times reached: ${MAX_TOKEN_INIT_TIMES}`);

          return {
            stop: true,
            tickets: [],
          } as AviasalesTicketResponse;
        }

        return this.loadTickets();
      });
  }

  public initToken(): Promise<any> {
    return this.initTokenRequest()
      .then(response => {
        this._searchId = (response.data as AviasalesSearchResponse).searchId;
        this._tokenInitTimes = 0;
      })
      .catch(error => {
        this._tokenInitTimes++;
        console.error(`Cannot init token AviasalesService: ${error}`);

        if (MAX_TOKEN_INIT_TIMES === this._tokenInitTimes) {
          throw new Error(`AviasalesService. Maximum token call times reached: ${MAX_TOKEN_INIT_TIMES}`);
        }
      });
  }

  private initTokenRequest(): AxiosPromise {
    return this._axios.get('/search');
  }

  private getTicketsRequest(): Promise<any> {
    return this._axios.get('/tickets', {
      params: {
        searchId: this._searchId,
      }
    });
  }
}
