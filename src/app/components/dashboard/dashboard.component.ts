import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private apiServiceService: ApiServiceService) { }
  usrs: number = 0;
  louder: boolean = false;
  ngOnInit(): void {
    this.countUsers();
  }

  public countUsers(){
    this.apiServiceService.CountUsers().subscribe((res:any)=>{
      this.louder = true
      this.usrs = res.count;
    })
  }
}
