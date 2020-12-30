import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {CartService} from '../../services/cart/cart.service';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../../services/http/http.service';
import {NgxImageCompressService} from 'ngx-image-compress';

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

  constructor(private router: Router,
              private authService: AuthService,
              private cartService: CartService,
              private http: HttpClient,
              private httpService: HttpService,
              private imageCompress: NgxImageCompressService,
  ) {
    this.serverData = new Map<string, any>();
    if (authService.isLogin === false) {
      this.router.navigate(['/auth/user']);
    } else {
      this.http.get(this.httpService.server + this.httpService.api.medicine.all)
        .subscribe((data: any) => {
          if (data.status === 'success') {
            this.serverData = new Map<string, any>();
            data.data.forEach((i: any) => {
              const obj: any = {
                id: i._id,
                name: i.name,
                company: i.company,
                price: i.price,
              };
              this.serverData.set(i._id, obj);
            });
          }
        });
      this.items = Array.from(this.cartService.items.entries());
      this.cartItems = [];
      this.items.forEach((i: any) => {
        const data: any = {
          id: i[0],
          count: i[1],
          name: 'Medicine Name',
          company: 'Company Name',
          price: 0.0,
        };
        this.cartItems.push(data);
      });
    }

  }

  ngOnInit(): void {
  }

  public totalPrice(price: number, count: number): number {
    return price * count;
  }

  public submit(): void {
    if (this.prescription === undefined || this.prescription === null) {
      this.prescriptionValidation = 'is-invalid';
    } else {
      let total = 0;
      this.cartItems.forEach((i: any) => {
        total += i.count * this.serverData.get(i.id).price;
      });
      this.cartService.placeOrder(this.cartItems, total, this.prescription, );
    }
  }

  public selectedPrescription(files: FileList): void {
    this.prescription = null;
    const mimeType = files[0].type.toString().substring(0, 5);
    if (mimeType !== 'image') {
      alert('Please select an image file');
    } else {
      const imageFile: File = files.item(0);
      // console.log('Before Corp: ', this.prescription);
      const quality: number = (50000 * 100) / imageFile.size;
      if (imageFile.size > 50000) {
        this.compress(imageFile, quality);
      }
    }
  }

  public async compress(file: File, quality: number): Promise<any> {
    const reader = new FileReader();
    reader.onload = async (result: any) => {
      // console.log(result.target.result);
      this.imageCompress.getOrientation(file).then((orientation: any) => {
        // console.log('orientation: ', orientation);
        this.imageCompress
          .compressFile(result.target.result, orientation, quality, quality)
          .then((compressedImage: any) => {
            console.log(this.imageCompress.byteCount(compressedImage));
            this.prescription = compressedImage;
            // fetch(compressedImage).then((res: any) => {
            //   return res.arrayBuffer();
            // }).then((buf: any) => {
            //   this.prescription = new File([buf], file.name, {type: file.type});
            //   // console.log(this.prescription);
            // });
          });
      });
    };
    reader.readAsDataURL(file);
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }
}
