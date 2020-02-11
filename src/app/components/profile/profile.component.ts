import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/service/player/player.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private currentLevelData: {}
  private currentStatsData: {}

  constructor(private player: PlayerService) { }

  ngOnInit() {
    this.player.xpChanged$.subscribe(levelData => {
      this.currentLevelData = levelData
    })

    this.player.statsChanged$.subscribe(statsData => {
      this.currentStatsData = statsData
    })

    this.player.calculateData()
  }
}
