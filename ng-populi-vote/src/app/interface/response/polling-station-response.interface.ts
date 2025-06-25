import { OptionResponse } from '../option-response.interface';

export interface PollingStationResponse {
  id: number;
  name: string;
  code: string;
  municipality: OptionResponse;
  address: string;
}
