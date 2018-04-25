import { NgModule } from '@angular/core'
import { SharedModule } from '../shared'
import { AccountRoutingModule } from './account-routing.module'
import { AccountComponent } from './account.component'
import { AccountVideosComponent } from './account-videos/account-videos.component'
import { AccountAboutComponent } from './account-about/account-about.component'
import { AccountVideoChannelsComponent } from './account-video-channels/account-video-channels.component'

@NgModule({
  imports: [
    AccountRoutingModule,
    SharedModule
  ],

  declarations: [
    AccountComponent,
    AccountVideosComponent,
    AccountVideoChannelsComponent,
    AccountAboutComponent
  ],

  exports: [
    AccountComponent
  ],

  providers: []
})
export class AccountModule { }
