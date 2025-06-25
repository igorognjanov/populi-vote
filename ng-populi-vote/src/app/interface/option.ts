import { Candidate } from './candidate.interface';

export interface Option {
  id: number;
  title: string;
  candidates: Candidate[];
}
