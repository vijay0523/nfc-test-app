import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {

  nfc_phase: boolean = true;
  nfc_check: boolean = false;
  qr_phase: boolean = false;
  qr_check: boolean = false;

  readerMode$: any;
  tagID: string;

  scanActive: boolean = false;
  QRcontent: string;
  registration_no: string;
  name: string;

  constructor(private nfc: NFC, private ndef: Ndef,private cd: ChangeDetectorRef) {}

  ngOnInit() {
    let flags = this.nfc.FLAG_READER_NFC_A | this.nfc.FLAG_READER_NFC_V;
    this.readerMode$ = this.nfc.readerMode(flags).subscribe(
        tag => {
          this.nfc_check = true;
          this.cd.detectChanges();
          console.log(JSON.stringify(tag));
          this.tagID = tag.id[0].toString(16)+tag.id[1].toString(16)+tag.id[2].toString(16)+tag.id[3].toString(16);
        },
        err => {
          this.nfc_check = false;
          this.cd.detectChanges();
          console.log('Error reading tag', err);
          this.tagID = "ERROR " + err;
        }
    );
  }

  async checkPermission() {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        resolve(true);
      } else if (status.denied) {
        BarcodeScanner.openAppSettings();
        resolve(false);
      }
    });
  }

  async startScanner() {
    const allowed = await this.checkPermission();

    if (allowed) {
      this.scanActive = true;
      BarcodeScanner.hideBackground();

      const result = await BarcodeScanner.startScan();

      if (result.hasContent) {
        this.scanActive = false;
        if(result.content.length < 30){
          alert('Please scan a valid QR code');
          this.QRcontent = 'Please scan a valid QR code';
          this.qr_check = false;
        }
        else {
          this.registration_no = result.content.split('Register No : ')[1].split(',')[0];
          this.name = result.content.split('Name : ')[1].split(',')[0];
          // alert(result.content); //The QR content will come out here
          this.QRcontent = '';
          this.qr_check = true;
        }
      } else {
        alert('NO DATA FOUND!');
        this.QRcontent = 'ERR: NO DATA';
      }
    } else {
      alert('NOT ALLOWED!');
      this.QRcontent = 'ERR: NOT ALLOWED';
    }
  }

  stopScanner() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

  ionViewWillLeave() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }
  

}
