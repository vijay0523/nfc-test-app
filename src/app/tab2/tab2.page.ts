import { Component } from '@angular/core';
import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  readerMode$: any;
  tagContent: any;
  tagID: string;

  constructor(private nfc: NFC, private ndef: Ndef) {
    // Read NFC Tag - Android
    // Once the reader mode is enabled, any tags that are scanned are sent to the subscriber
    let flags = this.nfc.FLAG_READER_NFC_A | this.nfc.FLAG_READER_NFC_V;
    this.readerMode$ = this.nfc.readerMode(flags).subscribe(
        tag => {console.log(JSON.stringify(tag)); this.tagContent = JSON.stringify(tag); this.tagID = tag.id[0].toString(16)+tag.id[1].toString(16)+tag.id[2].toString(16)+tag.id[3].toString(16)},
        err => {console.log('Error reading tag', err); this.tagContent = "ERROR " + err}
    );

    // Read NFC Tag - iOS
    // On iOS, a NFC reader session takes control from your app while scanning tags then returns a tag
    // try {
    //     let tag = await this.nfc.scanNdef();
    //     console.log(JSON.stringify(tag));
    // } catch (err) {
    //     console.log('Error reading tag', err);
    // }
  }

}
