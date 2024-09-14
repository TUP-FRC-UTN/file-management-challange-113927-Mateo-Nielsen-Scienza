import { Component } from '@angular/core';
import { FileFormComponent } from './file-form/file-form.component';
import { FileListComponent } from './file-list/file-list.component';
import { FileItem, FileType, FileOwner } from '../models/file.item.model';
import { FILE_LIST, OWNERS } from '../data/file.storage';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FileFormComponent, FileListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentFolder: FileItem | null = null;
  files: FileItem[] = FILE_LIST;  
  owners: FileOwner[] = OWNERS;  

  get folders(): FileItem[] {
    return this.files.filter(file => file.type === FileType.FOLDER);
  }

  get currentFiles(): FileItem[] {
    return this.files.filter(file => file.parentId === (this.currentFolder?.id || null));
  }

  addFile(newFile: FileItem) {
    this.files.push(newFile);
  }

  deleteFiles(selectedFiles: FileItem[]) {
    this.files = this.files.filter(file => !selectedFiles.includes(file));
  }

  navigateFolder(folder: FileItem | null) {
    this.currentFolder = folder;
  }
}
