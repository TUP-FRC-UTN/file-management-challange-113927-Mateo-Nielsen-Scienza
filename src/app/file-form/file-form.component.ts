import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';  // Importar FormsModule
import { FileItem, FileOwner, FileType } from '../../models/file.item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],  // Añadir FormsModule
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.css']
})
export class FileFormComponent {
  @Input() folders: FileItem[] = [];
  @Input() owners: FileOwner[] = [];
  @Output() saveFile = new EventEmitter<FileItem>();

  form: FormGroup;
  showForm: boolean = false;

  FileType = FileType;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      type: [FileType.FILE, Validators.required],
      owner: [null, Validators.required]
    });
  }

  submitForm() {
    if (this.form.valid) {
      const newFile: FileItem = {
        ...this.form.value,
        id: new Date().getTime().toString(),
        creation: new Date()
      };
      this.saveFile.emit(newFile);
      this.form.reset();
      this.showForm = false;
    }
  }

  closeForm() {
    this.form.reset();
    this.showForm = false;
  }
}
