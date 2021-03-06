import axios from "axios";

const TIMEOUT_EXCEPTION = 502;
const SUCCESS = 200;

export default class LongPollingService {
  private readonly _address: string;

  constructor(address: string) {
    this._address = address;
  }

  public async subscribe() {
    let response = await axios.get(this._address);

    if (response.status === TIMEOUT_EXCEPTION) {
      await this.subscribe();
    } else {
      if (response.status !== SUCCESS) {
        throw new Error(response.statusText);
      } else {
        return response.data;
      }
    }
  }
}
