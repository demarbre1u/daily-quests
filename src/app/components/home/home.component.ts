import { Component, OnInit } from '@angular/core';
import { XpService } from '../../service/xp/xp.service.js';
import { QuestsService } from 'src/app/service/quests/quests.service.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private dailyQuests = []

  constructor(private xp: XpService, private quests: QuestsService) {}

  ngOnInit() {
    this.dailyQuests = this.quests.getDailyQuests()
  }

  // Validates a quest from the daily quests
  validateQuest(index)
  {
    this.xp.addXP(this.dailyQuests[index].xp)

    this.removeQuest(index)
  }

  // Cancel a quest from the daily quests
  cancelQuest(index)
  {
    this.removeQuest(index)
  }

  // Removes a quest from the daily quests
  removeQuest(index)
  {
    this.quests.removeQuest(index)

    this.dailyQuests = this.quests.getDailyQuests()
  }

  reloadDailyQuests()
  {
    this.quests.pickDailyQuests()
    this.dailyQuests = this.quests.getDailyQuests()
  }
}
