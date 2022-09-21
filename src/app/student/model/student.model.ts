export interface Student {
  id?: string;
  firstName: string;
  lastName: string;

  birthDate: string;

  studentGroupIdList?: number[];
  studentSemesterIdList?: number[];

  mark?: number;
}
