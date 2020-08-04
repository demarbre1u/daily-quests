import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

import * as Quests from '../../../assets/data/quests.json';
import { PlayerService } from '../player/player.service.js';
import { AchievementService } from '../achievement/achievement.service';

@Injectable({
  providedIn: 'root'
})
export class QuestsService {

  private questsChangedSource = new Subject<Array<any>>()
  questsChanged$ = this.questsChangedSource.asObservable()

  public static DAILY_QUEST_NUMBER = 3
  private quests = Quests.quests
  private questsByDay = Quests.days

  constructor(private player: PlayerService, private achievements: AchievementService) 
  {
    this.checkDailyUpdate()

    // Checks if daily quests should be updated every minute
    setInterval(() => {
      this.checkDailyUpdate()
    }, 1000 * 60)
  }

  // Checks if the daily quests should be updated
  checkDailyUpdate()
  {
    // Get the current date in the format yyyy-mm-dd
    let today = new Date().toISOString().slice(0, 10)
    let lastUpdate = this.getLastUpdate()

    // Checks if last update was at least yesterday
    if(today.localeCompare(lastUpdate) === 1)
    {
      this.setLastUpdate(today)
      this.pickDailyQuests()
    }
  }

  // Picks DAILY_QUEST_NUMBER quests and add it to the daily quests
  pickDailyQuests()
  {
    let dailyQuests = this.getDailyQuests()
    let failedQuests = dailyQuests.length
    this.achievements.addQuestFailed(failedQuests)

    let pickedQuests = []

    // Picks one quest only available for the current day
    let weekday = this.getWeekDay()
    pickedQuests.push(this.pickQuest(weekday))
    
    // Fills the remaining quest slots with quests that are always available
    for(let i = 1; i < QuestsService.DAILY_QUEST_NUMBER; i++)
    {
      pickedQuests.push(this.pickQuest('always'))
    }
    
    this.setDailyQuest(pickedQuests)
  }

  // Picks a random quest given a day
  pickQuest(day)
  {
    let chosenQuest
    let requirementMet = false
    while(!requirementMet)
    {
      let weekdayQuests = this.questsByDay[day]
      let randomIndex = Math.round(Math.random() * (weekdayQuests.length - 1))
      let questId = weekdayQuests[randomIndex]
      chosenQuest = this.quests.filter(e => e.id === questId)[0]
  
      let requiredXP = chosenQuest.requirement ? chosenQuest.requirement : 0
      let currentXP = this.player.getStats()[chosenQuest.type]

      requirementMet = currentXP >= requiredXP
    }
    
    return chosenQuest
  }

  getWeekDay()
  {
    return (new Date().toLocaleDateString('en-US', { weekday: 'long' })).toLowerCase()
  }

  getDailyQuests()
  {
    let dailyQuests = JSON.parse(localStorage.getItem('dailyQuests'))

    return dailyQuests
  }

  setDailyQuest(quests)
  {
    localStorage.setItem('dailyQuests', JSON.stringify(quests))

    this.questsChangedSource.next(quests)
  }

  // Removes a quest from the daily quests
  cancelQuest(index)
  {
    let dailyQuests = this.getDailyQuests()

    dailyQuests = dailyQuests.filter((e, i) => i !== index)

    this.setDailyQuest(dailyQuests)
  }

  validateQuest(index)
  {
    let dailyQuests = this.getDailyQuests()

    let validatedQuest =  dailyQuests.filter((e, i) => i === index)[0]
    let questType = validatedQuest.type
    switch(questType) 
    {
      case 'strength':
        this.achievements.addStrengthQuestCleared(1)
        break;
      case 'intelligence':
        this.achievements.addIntelligenceQuestCleared(1)
        break;
      case 'wisdom':
        this.achievements.addWisdomQuestCleared(1)
        break;
    }
    this.achievements.addQuestCleared(1)

    dailyQuests = dailyQuests.filter((e, i) => i !== index)

    this.setDailyQuest(dailyQuests)
  }

  getLastUpdate()
  {
    let lastUpdate = JSON.parse(localStorage.getItem('last_update'))

    return lastUpdate ? lastUpdate : '0000-00-00'
  }

  setLastUpdate(date)
  {
    localStorage.setItem('last_update', JSON.stringify(date))
  }

  resetPlayerQuests() 
  {
    this.pickDailyQuests()
  }
}
