import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { GroupService } from './../../services/group.service';
import { FileUploadDialogData } from './utils/file-upload-dialog-data';

@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['./file-upload-dialog.component.scss'],
})
export class FileUploadDialogComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;
  constructor(
    public dialogRef: MatDialogRef<FileUploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FileUploadDialogData,
    public fb: FormBuilder,
    private sanitizer: DomSanitizer,
    public groupService: GroupService
  ) {}
  ngOnInit() {
    // this.fileInfos = this.uploadService.getFiles();
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  onCloseClick() {
    this.dialogRef.close();
  }

  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      console.log(file);
      if (file) {
        this.currentFile = file;
        this.groupService
          .upload(this.currentFile, this.data.groupId)
          .subscribe({
            next: (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round((100 * event.loaded) / event.total);
              } else if (event instanceof HttpResponse) {
                this.message = event.body.message;
                // this.fileInfos = this.uploadService.getFiles();
              }
            },
            error: (err: any) => {
              console.log(err);
              this.progress = 0;
              if (err.error && err.error.message) {
                this.message = err.error.message;
              } else {
                this.message = 'Could not upload the file!';
              }
              this.currentFile = undefined;
            },
          });
      }
      this.selectedFiles = undefined;
    }
  }
}
