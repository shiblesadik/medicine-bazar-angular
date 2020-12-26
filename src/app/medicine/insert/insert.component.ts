import {Component, OnInit} from '@angular/core';
import {MedicineService} from '../../services/medicine/medicine.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {
  name: string;
  nameValidation: string;
  company: string;
  companyValidation: string;
  description: string;
  descriptionValidation: string;
  price: number;
  priceValidation: string;
  count: number;
  countValidation: string;

  constructor(private medicineService: MedicineService) {
    this.medicineService.error.subscribe((err: string) => {
      if (err === 'already exists') {
        this.nameValidation = 'is-invalid';
      }
    });
  }

  ngOnInit(): void {
  }

  public submit(): void {
    let ok: boolean;
    ok = true;

    this.nameValidation = null;
    this.companyValidation = null;
    this.descriptionValidation = null;
    this.priceValidation = null;
    this.countValidation = null;

    if (this.name === undefined || this.name.length < 3) {
      this.nameValidation = 'is-invalid';
      ok = false;
    } else {
      this.nameValidation = 'is-valid';
    }

    if (this.company === undefined || this.company.length < 3) {
      this.companyValidation = 'is-invalid';
      ok = false;
    } else {
      this.companyValidation = 'is-valid';
    }

    if (this.description !== undefined && this.description.length < 10) {
      this.descriptionValidation = 'is-invalid';
      ok = false;
    } else {
    }

    if (this.price === undefined || this.price < 1.00) {
      this.priceValidation = 'is-invalid';
      ok = false;
    } else {
      this.priceValidation = 'is-valid';
    }

    if (this.count === undefined || this.count < 1) {
      this.countValidation = 'is-invalid';
      ok = false;
    } else {
      this.countValidation = 'is-valid';
    }

    if (ok) {
      const medicine: any = {
        name: this.name,
        company: this.company,
        description: this.description,
        price: this.price,
        count: this.count
      };
      this.medicineService.insert(medicine);
    }
  }
}
