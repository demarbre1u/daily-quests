import { Component, OnInit } from '@angular/core';

import * as Quests from './../../assets/quests/quests.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public static DAILY_QUEST_NUMBER = 3
  private quests = Quests.quests
  private dailyQuests = []

  constructor() {}

  ngOnInit() {
    this.dailyQuests = this.pickDailyQuests()
    console.log(this.dailyQuests)
  }

  // Picks DAILY_QUEST_NUMBER quests and add it to the daily quests
  pickDailyQuests()
  {
    let pickedQuests = []
    for(let i = 0; i < HomeComponent.DAILY_QUEST_NUMBER; i++)
    {
      let randomIndex = Math.round(Math.random() * (this.quests.length - 1))

      pickedQuests.push(this.quests[randomIndex])
    }
    
    return pickedQuests
  }

  // Validates a quest from the daily quests
  validateQuest(index)
  {
    this.removeQuest(index)
  }

  // Removes a quest from the daily quests
  cancelQuest(index)
  {
    this.removeQuest(index)
  }

  removeQuest(index)
  {
    this.dailyQuests = this.dailyQuests.filter((e, i) => i !== index)

    console.log(index)
  }
}
