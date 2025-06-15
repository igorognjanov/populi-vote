import { OptionResponse } from '../option-response.interface';

export interface PollingStationResponse {
  id: number;
  name: string;
  municipality: OptionResponse;
  address: string;
}
