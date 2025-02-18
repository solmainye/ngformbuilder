
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FormConfig {
  fields: {
    type: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    options?: string[] | string;
    defaultValue?: any;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class FormConfigService {
  constructor(private http: HttpClient) {}

  loadFormConfigFromFile(): Observable<FormConfig> {
    return this.http.get<FormConfig>('assets/form-config.json');
  }

  saveConfigToLocalStorage(config: FormConfig) {
    localStorage.setItem('formConfig', JSON.stringify(config));
  }

  loadConfigFromLocalStorage(): FormConfig | null {
    const saved = localStorage.getItem('formConfig');
    return saved ? JSON.parse(saved) : null;
  }

  downloadConfigAsFile(config: FormConfig) {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(config));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'form-config.json');
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
}
