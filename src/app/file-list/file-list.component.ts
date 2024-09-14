import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileItem, FileType } from '../../models/file.item.model';

@Component({
  selector: 'app-file-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent {
  @Input() files: FileItem[] = [];
  @Input() currentFolder: FileItem | null = null;
  @Output() deleteFiles = new EventEmitter<FileItem[]>();
  @Output() navigateToFolder = new EventEmitter<FileItem | null>();
  @Output() openNewFileForm = new EventEmitter<void>();

  selectedItems: FileItem[] = [];

  get folders(): FileItem[] {
    return this.files
      .filter(file => file.type === FileType.FOLDER && file.parentId === (this.currentFolder?.id || null))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  get filesList(): FileItem[] {
    return this.files
      .filter(file => file.type === FileType.FILE && file.parentId === (this.currentFolder?.id || null))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  selectItem(item: FileItem) {
    const index = this.selectedItems.indexOf(item);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
    } else {
      this.selectedItems.push(item);
    }
  }

  deleteSelected() {
    if (this.selectedItems.length > 0) {
      const confirmed = this.selectedItems.length > 1
        ? confirm('¿Deseas eliminar los archivos seleccionados?')
        : confirm('¿Deseas eliminar este archivo?');
      
      if (confirmed) {
        this.deleteFiles.emit(this.selectedItems);
        this.selectedItems = [];
      }
    }
  }

  openFolder(item: FileItem) {
    if (item.type === FileType.FOLDER) {
      this.selectedItems = [];
      this.navigateToFolder.emit(item);
    }
  }

  navigateBack() {
    this.selectedItems = [];
    this.navigateToFolder.emit(null);
  }

  trackByFn(index: number, item: FileItem) {
    return item.id;
  }

  onOpenNewFileForm() {
    this.openNewFileForm.emit();
  }
}
