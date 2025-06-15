import { OptionResponse } from '../option-response.interface';

export interface MunicipalityResponse {
  id: number;
  name: string;
  electoralDistrict: OptionResponse;
}
