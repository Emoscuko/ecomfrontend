// src/app/shared/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  enabled: boolean;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private api = `${environment.apiBaseUrl}/admin/users`;
  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get<User[]>(this.api);
  }

  // Toggle user enable/disable
  setUserEnabled(userId: number, enabled: boolean) {
    return this.http.put(`${this.api}/${userId}/enable`, { enabled });
  }
}
