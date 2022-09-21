import { Presence } from './presence.model';

export interface Meeting {
  id?: number;
  date: Date;
  groupId?: number;
  presenceList?: Presence[];
}
