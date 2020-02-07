import { Injectable } from '@angular/core';

import * as Quests from '../../../assets/data/quests.json';

@Injectable({
  providedIn: 'root'
})
export class QuestsService {

  public static DAILY_QUEST_NUMBER = 3
  private quests = Quests.quests

  constructor() {}

  // Checks if the daily quests should be updated
  checkDailyUpdate()
  {
    // Get the current date in the format yyyy-mm-dd
    let today = new Date().toISOString().slice(0, 10)
    let lastUpdate = this.getLastUpdate()

    // Checks if last update was at least yesterday
    if(today.localeCompare(lastUpdate) === 1)
    {
      this.pickDailyQuests()
      this.setLastUpdate(today)
      
      return true
    }

    return false
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

  getLastUpdate()
  {
    return JSON.parse(localStorage.getItem('last_update'))
  }

  setLastUpdate(date)
  {
    localStorage.setItem('last_update', JSON.stringify(date))
  }
}
