import { Lecturer } from './lecturer.model';
import { UserAccount } from './../../model/userAccount.model';

export interface LecturerUser extends Lecturer, UserAccount {}
