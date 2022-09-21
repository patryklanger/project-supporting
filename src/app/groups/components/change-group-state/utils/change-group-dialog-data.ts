import { GroupState } from 'src/app/groups/utils/groupState.model';

export interface ChangeGroupDialogData {
  groupId: number;
  currentState: GroupState;
  isFull: boolean;
}
