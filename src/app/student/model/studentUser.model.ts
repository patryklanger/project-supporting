import { Student } from './student.model';
import { UserAccount } from './../../model/userAccount.model';

export interface StudentUser extends Student, UserAccount {}
