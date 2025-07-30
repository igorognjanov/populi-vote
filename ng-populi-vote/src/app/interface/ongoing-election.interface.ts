export interface OngoingElection {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  type: string;
  hasVoted: boolean;
  question: string;
}
