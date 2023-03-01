import { Component, OnInit } from '@angular/core'
import { AuthService, AuthUser, ScreenService, ServerService } from '@app/core'
import { HTMLServerConfig, UserRole } from '@shared/models'
import { TopMenuDropdownParam } from '../shared/shared-main/misc/top-menu-dropdown.component'

@Component({
  templateUrl: './my-library.component.html',
  styleUrls: [ './my-library.component.scss' ]
})
export class MyLibraryComponent implements OnInit {
  menuEntries: TopMenuDropdownParam[] = []
  user: AuthUser

  private serverConfig: HTMLServerConfig

  constructor (
    private serverService: ServerService,
    private authService: AuthService,
    private screenService: ScreenService
  ) { }

  get isBroadcastMessageDisplayed () {
    return this.screenService.isBroadcastMessageDisplayed
  }

  ngOnInit (): void {
    this.serverConfig = this.serverService.getHTMLConfig()

    this.user = this.authService.getUser()

    this.authService.userInformationLoaded.subscribe(
      () => this.buildMenu()
    )
  }

  isVideoImportEnabled () {
    const importConfig = this.serverConfig.import.videos

    return importConfig.http.enabled || importConfig.torrent.enabled
  }

  private buildMenu () {
    this.menuEntries = [
    ]

    if (this.user.role.id != UserRole.USER) {
      this.menuEntries.push({
        label: $localize`Channels`,
        routerLink: '/my-library/video-channels'
      })
    }

    if (this.user.canSeeVideosLink && this.user.role.id != UserRole.USER) {
      this.menuEntries.push({
        label: $localize`Videos`,
        routerLink: '/my-library/videos'
      })
    }

    this.menuEntries = this.menuEntries.concat([
      {
        label: $localize`Follows`,
        children: [
          {
            label: $localize`Subscriptions`,
            iconName: 'subscriptions',
            routerLink: '/my-library/subscriptions'
          },
          {
            label: $localize`Followers`,
            iconName: 'follower',
            routerLink: '/my-library/followers'
          }
        ]
      },

      {
        label: $localize`Playlists`,
        routerLink: '/my-library/video-playlists'
      },

      {
        label: $localize`History`,
        routerLink: '/my-library/history/videos'
      }
    ])
  }
}
