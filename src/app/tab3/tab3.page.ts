import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  scanActive: boolean = false;
  QRcontent: string;
  registration_no: string;
  name: string;

  constructor() {

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
        }
        else {
          this.registration_no = result.content.split('Register No : ')[1].split(',')[0];
          this.name = result.content.split('Name : ')[1].split(',')[0];
          // alert(result.content); //The QR content will come out here
          this.QRcontent = '';
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
