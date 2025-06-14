import { OptionResponse } from './option-response.interface';

export interface MunicipalityResponse {
  name: string;
  electoralDistrict: OptionResponse;
}
