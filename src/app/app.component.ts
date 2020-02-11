import { Component, Output, ElementRef, ViewChild, OnInit } from '@angular/core';
import { PlayerService } from './service/player/player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'daily-quests';

  @ViewChild('username')
  private usernameInput: ElementRef

  constructor(private player: PlayerService) {}

  ngOnInit() {
    this.usernameInput.nativeElement.value = this.player.getUsername()
    this.resize()

    this.player.usernameChanged$.subscribe(username => {
      this.usernameInput.nativeElement.value = username
      this.resize()
    })
  }

  save()
  {
    let username = this.usernameInput.nativeElement.value
    this.player.saveUsername(username)
  }

  resize()
  {
    let value = this.usernameInput.nativeElement.value
    let size = value.length
    this.usernameInput.nativeElement.size = size === 0 ? 1 : size
  }
}
