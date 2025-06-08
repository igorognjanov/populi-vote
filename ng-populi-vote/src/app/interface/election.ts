import { Option } from '@angular/cli/src/command-builder/utilities/json-schema';

export interface Election {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  type: number;
  options: Option[];
}
