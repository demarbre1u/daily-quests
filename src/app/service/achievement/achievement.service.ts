import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AchievementService {

  private defaultAchievement = {
    questCleared: 0,
    questFailed: 0, 
    
    strengthQuest: 0, 
    intelligenceQuest: 0,
    wisdomQuest: 0, 
  }

  private achievementChangedSource = new Subject<any>()
  achievementChanged$ = this.achievementChangedSource.asObservable()

  constructor() { }

  getAchievements()
  {
    let achievements = JSON.parse(localStorage.getItem('achievements'))

    return achievements ? achievements : this.defaultAchievement
  }

  setAchievements(achievements)
  {
    localStorage.setItem('achievements', JSON.stringify(achievements))
    this.achievementChangedSource.next(achievements)
  }

  addQuestCleared(nb)
  {
    let achievements = this.getAchievements()
    achievements.questCleared += nb

    this.setAchievements(achievements)
  }

  addQuestFailed(nb)
  {
    let achievements = this.getAchievements()
    achievements.questFailed += nb

    this.setAchievements(achievements)
  }

  addStrengthQuestCleared(nb)
  {
    let achievements = this.getAchievements()
    achievements.strengthQuest += nb

    this.setAchievements(achievements)
  }

  addIntelligenceQuestCleared(nb)
  {
    let achievements = this.getAchievements()
    achievements.intelligenceQuest += nb

    this.setAchievements(achievements)
  }

  addWisdomQuestCleared(nb)
  {
    let achievements = this.getAchievements()
    achievements.wisdomQuest += nb

    this.setAchievements(achievements)
  }

  resetAchievements() 
  {
    this.setAchievements( this.defaultAchievement )
  }
}
