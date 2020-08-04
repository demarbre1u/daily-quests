import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../service/player/player.service.js';
import { QuestsService } from 'src/app/service/quests/quests.service.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], 
})
export class HomeComponent implements OnInit {

  private dailyQuests = []

  constructor(private player: PlayerService, private quests: QuestsService) {}

  ngOnInit() {
    // Listens to any change on the daily quests list in the Quest Service
    this.quests.questsChanged$.subscribe(newQuests => {
      this.dailyQuests = newQuests
    })

    this.dailyQuests = this.quests.getDailyQuests()
  }

  // Validates a quest from the daily quests
  validateQuest(index)
  {
    this.player.addXP(this.dailyQuests[index])

    this.quests.validateQuest(index)
  }

  // Cancel a quest from the daily quests
  cancelQuest(index)
  {
    this.quests.cancelQuest(index)
  }

  reloadDailyQuests()
  {
    this.quests.pickDailyQuests()
  }
}
