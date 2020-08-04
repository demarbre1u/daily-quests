import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/service/player/player.service';
import { QuestsService } from 'src/app/service/quests/quests.service';
import { AchievementService } from 'src/app/service/achievement/achievement.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private currentLevelData: {}
  private currentStatsData: {}
  private currentAchievements: {}

  constructor(private player: PlayerService, private quests: QuestsService, private achievements: AchievementService) { }

  ngOnInit() {
    this.player.xpChanged$.subscribe(levelData => {
      this.currentLevelData = levelData
    })

    this.player.statsChanged$.subscribe(statsData => {
      this.currentStatsData = statsData
    })

    this.achievements.achievementChanged$.subscribe(newAchievements => {
      console.log(newAchievements)
      this.currentAchievements = newAchievements
    })

    this.player.calculateData()
    this.currentAchievements = this.achievements.getAchievements()
  }

  resetPlayerStats() {
    this.player.resetPlayerStats()
    this.quests.resetPlayerQuests()
  }
}
