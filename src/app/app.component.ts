import { Component, OnInit } from '@angular/core';
import { MainService } from './main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  empData:any = [];
  selectedIds = [];
  constructor(private mainService:MainService) {

  }

  ngOnInit() {
    this.mainService.getServiceData().subscribe(res=>{
      this.empData = JSON.parse(res['_body']);
    },err=>{
      console.log(err);
    });
  }

  selectRow(i:number) {
    if(this.selectedIds.indexOf(i)>-1) {
      this.selectedIds.splice(this.selectedIds.indexOf(i),1);
    } else {
      this.selectedIds.push(i);
      this.selectedIds = this.selectedIds.sort(function(a,b){return a-b});
    }
  }

  moveDown() {
    let array = JSON.parse(JSON.stringify(this.empData)); 
    for(let i = this.selectedIds.length-1;i >= 0;i--) {
      if((this.selectedIds[i]!=this.empData.length-1) && this.selectedIds.indexOf(this.selectedIds[i]+1)==-1)  {
        array = this.swapRow(array,this.selectedIds[i],this.selectedIds[i]+1);
        this.selectedIds[i] = this.selectedIds[i]+1; 
      }
    }
    this.empData = array;
  }

  moveUp() {
    let array = JSON.parse(JSON.stringify(this.empData)); 
    for(let i = 0;i < this.selectedIds.length;i++) {
      if((this.selectedIds[i]!=0) && this.selectedIds.indexOf(this.selectedIds[i]-1)==-1)  {
        array = this.swapRow(array,this.selectedIds[i]-1,this.selectedIds[i]);
        this.selectedIds[i] = this.selectedIds[i]-1; 
      }
    }
    this.empData = array;
  }

  swapRow(array: any, start: number, next: number) {
     array.splice(start,2,array[next],array[start]);
     return array;
  }
}
