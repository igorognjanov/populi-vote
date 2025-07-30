import { Candidate } from './candidate.interface';

export interface Option {
  id: number;
  title: string;
  municipalityId: number;
  electoralDistrictId: number;
  candidates: Candidate[];
  numberOfPhysicalVotes: number;
}
