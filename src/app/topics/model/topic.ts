import { Lecturer } from 'src/app/lecturers/models/lecturer.model';

export interface Topic {
  id?: number;
  topicName: string;
  description: string;

  lecturer?: Lecturer;
  groupIds?: number[];
}
