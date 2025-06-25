import { Option } from './option';

export interface Election {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  type: number;
  options: Option[];
  electoralDistrictIds: number[];
  municipalityIds: number[];
}
