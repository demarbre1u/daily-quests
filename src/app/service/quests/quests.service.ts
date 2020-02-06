import { Injectable } from '@angular/core';

import * as Quests from '../../../assets/data/quests.json';

@Injectable({
  providedIn: 'root'
})
export class QuestsService {

  public static DAILY_QUEST_NUMBER = 3
  private quests = Quests.quests
  private dailyQuests = []

  constructor() {
    this.dailyQuests = this.pickDailyQuests()
  }

  // Picks DAILY_QUEST_NUMBER quests and add it to the daily quests
  pickDailyQuests()
  {
    let pickedQuests = []
    for(let i = 0; i < QuestsService.DAILY_QUEST_NUMBER; i++)
    {
      let randomIndex = Math.round(Math.random() * (this.quests.length - 1))

      pickedQuests.push(this.quests[randomIndex])
    }
    
    return pickedQuests
  }

  getDailyQuests()
  {
    return this.dailyQuests
  }

  // Removes a quest from the daily quests
  removeQuest(index)
  {
    this.dailyQuests = this.dailyQuests.filter((e, i) => i !== index)
  }
}
