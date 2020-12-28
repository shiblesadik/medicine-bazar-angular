import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MedicineService} from '../../services/medicine/medicine.service';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent implements OnInit {
  searchInput: string;
  backup: any;

  @Input() medicines: any;

  constructor(private router: Router,
              private medicineService: MedicineService) {
  }

  ngOnInit(): void {
    this.backup = this.medicines;
  }

  public details(id: string): void {
    const data: any = this.backup.find(i => i._id === id);
    this.medicineService.currentData = data;
    this.router.navigate(['/medicine/view']);
  }

  public search(): void {
    this.medicines = [];
    this.backup.forEach((medicine: any) => {
      const name = medicine.name.toLowerCase().toString();
      const company = medicine.company.toLowerCase().toString();
      const searchStr = this.searchInput.toLowerCase().toString().trim();
      if (name.includes(searchStr)) {
        this.medicines.push(medicine);
      } else if (company.includes(searchStr)) {
        this.medicines.push(medicine);
      }
    });
  }

  public clear(): void {
    this.searchInput = '';
  }
}
