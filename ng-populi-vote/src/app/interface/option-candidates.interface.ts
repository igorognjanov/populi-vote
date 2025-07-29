import { Option } from './option';

export interface OptionCandidates {
  municipalityId: number;
  electoralDistrictId: number;
  options: Option[];
}

