import { Component, OnInit, Input } from '@angular/core';
import { Group } from '../../model/group.model';

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.scss'],
})
export class GroupCardComponent implements OnInit {
  @Input() group: Group;

  constructor() {}

  showAddStudentsDialog() {}

  showChangeStateDialog() {}

  singMeUpToGroup() {}

  ngOnInit(): void {}
}
