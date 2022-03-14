import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { NFC, Ndef } from "@awesome-cordova-plugins/nfc/ngx";

import { Tab2PageRoutingModule } from './tab2-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    // NFC,
    // Ndef
  ],
  providers: [NFC, Ndef],
  declarations: [Tab2Page]//, Ndef, NFC],
  // exports: [Ndef, NFC]
})
export class Tab2PageModule {}
