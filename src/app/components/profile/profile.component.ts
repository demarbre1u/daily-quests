import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/service/player/player.service';
import { QuestsService } from 'src/app/service/quests/quests.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private currentLevelData: {}
  private currentStatsData: {}

  constructor(private player: PlayerService, private quests: QuestsService) { }

  ngOnInit() {
    this.player.xpChanged$.subscribe(levelData => {
      this.currentLevelData = levelData
    })

    this.player.statsChanged$.subscribe(statsData => {
      this.currentStatsData = statsData
    })

    this.player.calculateData()
  }

  resetPlayerStats() {
    this.player.resetPlayerStats()
    this.quests.resetPlayerQuests()
  }
}
