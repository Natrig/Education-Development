import { IAxiosService } from "./IAxiosService";
import axios, { AxiosInstance, AxiosPromise } from "axios";
import { TicketDTO } from "../models/TicketDTO";

const ADDRESS = 'https://front-test.beta.aviasales.ru/';
const MAX_TOKEN_INIT_TIMES = 3;

const TIMEOUT_EXCEPTION = 502;
const SUCCESS = 200;

interface AviasalesTicketResponse {
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

  public async getTickets() {
    // GET TOKEN

    // GET ARRAYS AND RETURN

    if (!this._searchId) {
      await this.initTokenApi()
        .then(response => {
          this._searchId = (response.data as AviasalesSearchResponse).searchId;
        })
        .catch(error => {
          console.error(`Cannot init token AviasalesService: ${error}`);
        });
    }

    await this._axios.get('/tickets', {
      params: {
        searchId: this.getToken(),
      }
    }).then((response) => {
      if (response.status !== SUCCESS) {
        this.getTickets();
      } else {
        const data = response.data as AviasalesTicketResponse;

        console.log(data);

        if (!data.stop) {
          this.getTickets();
        }
      }
    }).catch(() => {
      this.getTickets();
    })
  }

  private initTokenApi(): AxiosPromise {
    return this._axios.get('/search');
  }

  private isTokenInit() {
    console.log(this._searchId);
    return !!this._searchId;
  }

  private getToken() {
    return this._searchId;
  }
}
