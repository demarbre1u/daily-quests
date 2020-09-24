import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/service/player/player.service';
import { QuestsService } from 'src/app/service/quests/quests.service';
import { AchievementService } from 'src/app/service/achievement/achievement.service';
import { TodoListService } from 'src/app/service/todo/todo-list.service';

import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color } from 'ng2-charts';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // Pie Chart common configs
  public pieChartOptions: ChartOptions = {
    responsive: true,
  }
  public pieChartType: ChartType = 'pie'
  public pieChartLegend = true
  public pieChartPlugins = []

  // General Pie Chart
  public generalChartLabels: Label[] = ['Cleared', 'Failed']
  public generalChartData: SingleDataSet = [0, 0]
  public generalChartColors= [
    {
      backgroundColor: ['#2ecc71', '#2c3e50'],
    },
  ]  

  // Detailed Pie Chart
  public detailedChartLabels: Label[] = ['Strength', 'Intelligence', 'Wisdom']
  public detailedChartData: SingleDataSet = [0, 0, 0]
  public detailedChartColors= [
    {
      backgroundColor: ['#1abc9c', '#e74c3c', '#9b59b6'],
    },
  ]

  private currentLevelData: {}
  private currentStatsData: {}
  private currentAchievements: {}

  constructor(private player: PlayerService, private quests: QuestsService, private todolist: TodoListService, private achievements: AchievementService) {
    monkeyPatchChartJsTooltip()
    monkeyPatchChartJsLegend()
  }

  ngOnInit() {
    this.player.xpChanged$.subscribe(levelData => this.currentLevelData = levelData)
    this.player.statsChanged$.subscribe(statsData => this.currentStatsData = statsData)
    this.achievements.achievementChanged$.subscribe(newAchievements => {
      this.currentAchievements = newAchievements

      // We have to create a new ref. so Angular can detect that the value has changed
      this.updatePieCharts(newAchievements)
    })

    this.player.calculateData()
    this.currentAchievements = this.achievements.getAchievements()

    // We have to create a new ref. so Angular can detect that the value has changed
    this.updatePieCharts(this.currentAchievements)
  }

  updatePieCharts(achievements) {
    this.generalChartData = JSON.parse(JSON.stringify([achievements.questCleared, achievements.questFailed]))
    this.detailedChartData = JSON.parse(JSON.stringify([achievements.strengthQuest, achievements.intelligenceQuest, achievements.wisdomQuest]))
  }

  resetPlayerStats() {
    this.player.resetPlayerStats()
    this.quests.resetPlayerQuests()
    this.todolist.resetTodoList()
    this.achievements.resetAchievements()
  }
}
