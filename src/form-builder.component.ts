import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-form-builder',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent {
  formBuilderForm: FormGroup;
  fieldTypes = ['text', 'dropdown', 'checkbox', 'radio'];

  constructor(private fb: FormBuilder) {
    this.formBuilderForm = this.fb.group({
      fields: this.fb.array([])
    });
  }

  get fields(): FormArray {
    return this.formBuilderForm.get('fields') as FormArray;
  }

  onSelectChange(event: Event) {
    const selectEl = event.target as HTMLSelectElement | null;
    if (!selectEl) return;

    const chosenType = selectEl.value;
    if (!chosenType) return;

    this.addField(chosenType);
  }

  addField(fieldType: string) {
    if (!fieldType) return;

    const fieldGroup = this.fb.group({
      type: [fieldType, Validators.required],
      label: ['', Validators.required],
      placeholder: [''],
      required: [false],
      options: [''],
      defaultValue: ['']
    });
    this.fields.push(fieldGroup);
  }

  removeField(index: number) {
    this.fields.removeAt(index);
  }

  saveFormConfig() {
    localStorage.setItem('formConfig', JSON.stringify(this.formBuilderForm.value));
  }

  loadFormConfig() {
    const savedConfig = localStorage.getItem('formConfig');
    if (savedConfig) {
      const config = JSON.parse(savedConfig);
      const arrayOfGroups = config.fields.map((f: any) =>
        this.fb.group({
          type: [f.type, Validators.required],
          label: [f.label, Validators.required],
          placeholder: [f.placeholder],
          required: [f.required],
          options: [f.options],
          defaultValue: [f.defaultValue]
        })
      );
      this.formBuilderForm.setControl('fields', this.fb.array(arrayOfGroups));
    }
  }

  updateOptions(index: number, event: Event) {
    const fieldGroup = this.fields.at(index) as FormGroup;
    const input = event.target as HTMLInputElement | null;
    if (!input) return;

    const arrayOfOptions = input.value.split(',').map(o => o.trim());
    fieldGroup.patchValue({ options: arrayOfOptions });
  }
}
