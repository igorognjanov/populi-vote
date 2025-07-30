import { Option } from './option';
import { OptionCandidates } from './option-candidates.interface';

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
  hasVoted: boolean;
  submitted: boolean;
  optionCandidates: OptionCandidates[];
  question: string;
}
