import {Injectable} from '@angular/core';
import {StorageService} from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userData: any;

  constructor(private storageService: StorageService) {
    this.userData = null;
    this.userData = storageService.getUserData();
  }
}
