import { Component, OnInit } from '@angular/core';
import { XpService } from 'src/app/service/xp/xp.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private currentLevelData: {}

  constructor(private xp: XpService) { }

  ngOnInit() {
    this.currentLevelData = this.xp.getCurrentLevelData()
  }
}
