import { Student } from '../student/model/student.model';

export interface Presence {
  id?: number;

  wasPresent: boolean;

  student: Student;
}
