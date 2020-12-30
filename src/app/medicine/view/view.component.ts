import {Component, OnInit} from '@angular/core';
import {MedicineService} from '../../services/medicine/medicine.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
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

  constructor(private medicineService: MedicineService,
              private router: Router
  ) {
    if (this.medicineService.currentData === undefined || this.medicineService.currentData === null) {
      this.router.navigate(['medicine/all']);
    }
  }

  ngOnInit(): void {
    const data = this.medicineService.currentData;
    this.name = data.name;
    this.company = data.company;
    this.description = data.description;
    this.price = data.price;
    this.count = data.count;
  }

  public delete(): void {
    this.medicineService.delete(this.medicineService.currentData._id);
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
      this.medicineService.update(medicine, this.medicineService.currentData._id);
    }
  }

}
