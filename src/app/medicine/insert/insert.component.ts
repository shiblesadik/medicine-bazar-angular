import {Component, OnInit} from '@angular/core';
import {MedicineService} from '../../services/medicine/medicine.service';
import {NgxImageCompressService} from 'ngx-image-compress';

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
  type: string;
  typeValidation: string;
  fullPriceValidation: string;
  fullPrice: string;
  medicineImage: string;
  medicineImageValidation: string;

  constructor(private medicineService: MedicineService,
              private imageCompress: NgxImageCompressService,
  ) {
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

    if (this.price === undefined || this.price < 1.00) {
      this.priceValidation = 'is-invalid';
      ok = false;
    } else {
      this.priceValidation = 'is-valid';
    }

    if (this.description === undefined || this.description.length < 3) {
      this.descriptionValidation = 'is-invalid';
      ok = false;
    } else {
      this.descriptionValidation = 'is-valid';
    }

    if (this.count === undefined || this.count < 1) {
      this.countValidation = 'is-invalid';
      ok = false;
    } else {
      this.countValidation = 'is-valid';
    }

    if (this.type === undefined || this.type === null) {
      this.typeValidation = 'is-invalid';
      ok = false;
    } else {
      this.typeValidation = 'is-valid';
    }

    if (this.medicineImage === undefined || this.medicineImage === null) {
      this.medicineImageValidation = 'is-invalid';
      ok = false;
    } else {
      this.medicineImageValidation = 'is-valid';
    }

    if (ok) {
      const medicine: any = {
        name: this.name,
        company: this.company,
        description: this.description,
        price: this.price,
        type: this.type,
        fullPrice: this.fullPrice,
        count: this.count
      };
      this.medicineService.insert(medicine, this.medicineImage);
    }
  }

  public selectedPrescription(files: FileList): void {
    this.medicineImage = null;
    const mimeType = files[0].type.toString().substring(0, 5);
    console.log(mimeType);
    if (mimeType !== 'image') {
      alert('Please select an image file');
    } else {
      const imageFile: File = files.item(0);
      const quality: number = (50000 * 100) / imageFile.size;
      if (imageFile.size > 50000) {
        this.compress(imageFile, quality);
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = () => {
          this.medicineImage = reader.result.toString();
        };
      }
    }
  }

  public async compress(file: File, quality: number): Promise<any> {
    const reader = new FileReader();
    reader.onload = async (result: any) => {
      console.log(result.target.result);
      this.imageCompress.getOrientation(file).then((orientation: any) => {
        this.imageCompress
          .compressFile(result.target.result, orientation, quality, quality)
          .then((compressedImage: any) => {
            console.log(this.imageCompress.byteCount(compressedImage));
            this.medicineImage = compressedImage;
          });
      });
    };
    reader.readAsDataURL(file);
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }
}
