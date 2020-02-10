import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import * as xpTable from '../../../assets/data/xp_table.json';
import * as statsTable from '../../../assets/data/stats_table.json';

@Injectable({
  providedIn: 'root'
})
export class XpService {

  // The default stats if the player doesn't have any yet
  private defaultStatsObject = {
    strength: 0, 
    intelligence: 0, 
    wisdom: 0
  }

  private xpChangedSource = new Subject<any>()
  xpChanged$ = this.xpChangedSource.asObservable()

  private statsChangedSource = new Subject<any>()
  statsChanged$ = this.statsChangedSource.asObservable()

  private xpTable = xpTable.xp_table
  private statsTable = statsTable.stats_table

  constructor() 
  {
    this.calculateData()
  }

  // Calculates the current level of the player based on their total XP
  calculateData()
  {
    this.calculateLevelData()
    this.calculateStatsData()
  }

  // Calculates the data related to the XP in general
  calculateLevelData()
  {
    let currentXP = this.getXP()
    let xpRange = this.xpTable.filter(e => currentXP >= e.from && currentXP < e.to)[0]
    let xpNeeded = xpRange.to - xpRange.from
    let currentLvl = xpRange.level
    currentXP -= xpRange.from
    let percentage = Math.round(currentXP / xpNeeded * 100)

    this.xpChangedSource.next({currentLvl, currentXP, xpNeeded, percentage})
  }

  // Calculates the data related to the stats
  calculateStatsData()
  {
    let currentStats = this.getStats()
    let newStats = {}
    for(let stats of Object.keys(currentStats))
    {
      let statsRange = this.statsTable.filter(e => currentStats[stats] >= e.from && currentStats[stats] < e.to)[0]
      let statsNeeded = statsRange.to - statsRange.from
      let currentStatsLevel = statsRange.level
      let currentStatsXp = currentStats[stats] - statsRange.from
      let statsPercentage = Math.round(currentStatsXp / statsNeeded * 100)

      newStats[stats] = {currentStatsLevel, currentStatsXp, statsNeeded, statsPercentage}
    }

    this.statsChangedSource.next(newStats)
    console.log(newStats)
  }

  getXP()
  {
    return JSON.parse(localStorage.getItem('xp'))
  }

  getStats()
  {
    let stats = JSON.parse(localStorage.getItem('stats'))

    return stats ? stats : this.defaultStatsObject
  }

  // Add a given amount of XP to the total XP of the player
  addXP(quest)
  {
    let xp = quest.xp
    let currentXP = this.getXP() + xp
    localStorage.setItem('xp', currentXP)
    this.calculateLevelData()

    // We add the XP also in the given stat
    let type = quest.type
    let stats = this.getStats()
    stats[type] += xp
    localStorage.setItem('stats', JSON.stringify(stats))
    this.calculateStatsData()
  }
}
