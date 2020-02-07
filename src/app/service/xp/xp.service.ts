import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import * as xpTable from '../../../assets/data/xp_table.json';

@Injectable({
  providedIn: 'root'
})
export class XpService {

  private xpChangedSource = new Subject<any>()
  xpChanged$ = this.xpChangedSource.asObservable()

  private xpTable = xpTable.xp_table

  constructor() 
  {
    this.calculateLevelData()
  }

  // Calculates the current level of the player based on their total XP
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

  getXP()
  {
    return JSON.parse(localStorage.getItem('xp'))
  }

  // Add a given amount of XP to the total XP of the player
  addXP(xp)
  {
    let currentXP = this.getXP() + xp

    localStorage.setItem('xp', currentXP)

    this.calculateLevelData()
  }
}
