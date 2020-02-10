import { Component, OnInit } from '@angular/core';
import { XpService } from 'src/app/service/xp/xp.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private currentLevelData: {}
  private currentStatsData: {}

  constructor(private xp: XpService) { }

  ngOnInit() {
    this.xp.xpChanged$.subscribe(levelData => {
      this.currentLevelData = levelData
    })

    this.xp.statsChanged$.subscribe(statsData => {
      this.currentStatsData = statsData

      console.log(statsData)
    })

    this.xp.calculateData()
  }
}
