import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {CartService} from '../../services/cart/cart.service';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../../services/http/http.service';
import {NgxImageCompressService} from 'ngx-image-compress';
import {StorageService} from '../../services/storage/storage.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  public cartItems: any = [];
  private serverData: Map<string, any>;
  public items: any = null;
  public prescription: string;
  public prescriptionValidation: string;
  public totalPrice: number;
  public userData: any;
  public address: string;

  constructor(private router: Router,
              private authService: AuthService,
              private cartService: CartService,
              private http: HttpClient,
              private httpService: HttpService,
              private imageCompress: NgxImageCompressService,
              private storageService: StorageService,
  ) {
    this.totalPrice = 0;
    if (authService.isLogin === false) {
      this.router.navigate(['/auth/user']);
    } else {
      this.userData = this.storageService.userData;
      this.address = this.userData.address;
      this.items = Array.from(this.cartService.items.entries());
      this.cartItems = [];
      this.items.forEach((i: any) => {
        const data: any = {
          id: i[0],
          count: i[1].count,
          img: i[1].img,
          fullCount: i[1].fullCount,
          name: i[1].name,
          company: i[1].company,
          description: i[1].description,
          type: i[1].type,
          price: i[1].price,
          fullPrice: i[1].fullPrice,
        };
        this.totalPrice += (data.count * data.price) + (data.fullCount * data.fullPrice);
        this.cartItems.push(data);
      });
    }

  }

  ngOnInit(): void {
  }

  public submit(): void {
    if (this.prescription === undefined || this.prescription === null) {
      this.prescriptionValidation = 'is-invalid';
    } else {
      this.cartService.placeOrder(this.cartItems, this.totalPrice, this.prescription, this.address);
    }
  }

  public selectedPrescription(files: FileList): void {
    this.prescription = null;
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
          this.prescription = reader.result.toString();
        };
      }
    }
  }

  public calculate(count: number, price: number, fullCount: number, fullPrice: number): number {
    return (count * price) + (fullCount * fullPrice);
  }

  public async compress(file: File, quality: number): Promise<any> {
    const reader = new FileReader();
    reader.onload = async (result: any) => {
      console.log(result.target.result);
      this.imageCompress.getOrientation(file).then((orientation: any) => {
        // console.log('orientation: ', orientation);
        this.imageCompress
          .compressFile(result.target.result, orientation, quality, quality)
          .then((compressedImage: any) => {
            console.log(this.imageCompress.byteCount(compressedImage));
            this.prescription = compressedImage;
          });
      });
    };
    reader.readAsDataURL(file);
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }
}
