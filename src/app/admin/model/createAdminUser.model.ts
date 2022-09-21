import { UserAccount } from './../../model/userAccount.model';

export interface CreateAdminUser extends UserAccount {
  firstName: string;
  lastName: string;
}
