import { Meeting } from 'src/app/model/meeting.model';
import { Student } from 'src/app/student/model/student.model';
import { GroupState } from '../utils/groupState.model';
import { Topic } from './../../topics/model/topic';

export interface Group {
  id?: number;
  groupState: GroupState;

  semesterId?: number;
  topic: Topic;
  maxSize: number;
  students: Student[];
  meetings?: Meeting[];
  filePaths?: string[];
}
