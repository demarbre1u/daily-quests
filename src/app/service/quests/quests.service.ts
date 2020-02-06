import { Injectable } from '@angular/core';

import * as Quests from '../../../assets/data/quests.json';

@Injectable({
  providedIn: 'root'
})
export class QuestsService {

  public static DAILY_QUEST_NUMBER = 3
  private quests = Quests.quests

  constructor() { }

  // Picks DAILY_QUEST_NUMBER quests and add it to the daily quests
  pickDailyQuests()
  {
    let pickedQuests = []
    for(let i = 0; i < QuestsService.DAILY_QUEST_NUMBER; i++)
    {
      let randomIndex = Math.round(Math.random() * (this.quests.length - 1))

      pickedQuests.push(this.quests[randomIndex])
    }
    
    this.setDailyQuest(pickedQuests)
  }

  getDailyQuests()
  {
    let dailyQuests = JSON.parse(localStorage.getItem('dailyQuests'))

    return dailyQuests
  }

  setDailyQuest(quests)
  {
    localStorage.setItem('dailyQuests', JSON.stringify(quests))
  }

  // Removes a quest from the daily quests
  removeQuest(index)
  {
    let dailyQuests = this.getDailyQuests()

    dailyQuests = dailyQuests.filter((e, i) => i !== index)

    this.setDailyQuest(dailyQuests)
  }
}
