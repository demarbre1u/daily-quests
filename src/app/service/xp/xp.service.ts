import { Injectable, OnInit } from '@angular/core';
import * as xpTable from '../../../assets/data/xp_table.json';

@Injectable({
  providedIn: 'root'
})
export class XpService {

  private xpTable = xpTable.xp_table
  private currentLvl = 0

  constructor() 
  {
    this.calculateLevel()
  }

  // Calculates the current level of the player based on their total XP
  calculateLevel()
  {
    let currentXP = this.getXP()

    let xpRange = this.xpTable.filter(e => currentXP >= e.from && currentXP < e.to)

    this.currentLvl = xpRange[0].level
  }

  getXP()
  {
    return JSON.parse(localStorage.getItem('xp'))
  }

  // Add a given amount of XP to the total XP of the player
  addXP(xp)
  {
    let currentXP = this.getXP() + xp

    localStorage.setItem('xp', currentXP)

    this.calculateLevel()
  }

  // Returns all the data about the current player's level
  getCurrentLevelData()
  {
    let currentXP = this.getXP()

    let xpRange = this.xpTable.filter(e => currentXP >= e.from && currentXP < e.to)[0]

    let xpNeeded = xpRange.to - xpRange.from

    currentXP -= xpRange.from

    let percentage = Math.round(currentXP / xpNeeded * 100)

    return {currentLvl: this.currentLvl, currentXP, xpNeeded, percentage}
  }
}
