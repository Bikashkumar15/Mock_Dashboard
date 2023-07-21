import { Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommonModule, NgFor } from '@angular/common';
import {} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import * as XLSX from 'xlsx';
import { FormsModule } from '@angular/forms';



export interface PeriodicElement {deviceId:string;
  latitude:string; tdsSens1:string; tdsSens2:string; tdsSens3:string;tempSens1:string; tempSens2:string; tempSens3:string;flowSens1:string; flowSens2:string; flowSens3:string;currentTimestamp:string;
}
  @Component({
    selector: 'app-pws-table',
    templateUrl: './pws-table.component.html',
    styleUrls: ['./pws-table.component.scss'],
    standalone: true,
    imports:[
      NgFor,MatTableModule, MatPaginatorModule,FormsModule,CommonModule
    ]
  })

 
export class PwsTableComponent implements OnInit , AfterViewInit  {
  
    minV:any; 
    maxV:any = new Date().toISOString().slice(0,10);

  
  constructor(private authService: AuthService) {  }
  displayedColumns: string[] = ['deviceId','latitude', 'tdsSens1', 'tdsSens2', 'tdsSens3','tempSens1', 'tempSens2', 'tempSens3','flowSens1', 'flowSens2', 'flowSens3','currentTimestamp'];
 

  @ViewChild(MatPaginator) paginator: any ;
  datasource = new MatTableDataSource<PeriodicElement>([]);

  
  @ViewChild('TABLE')
  table!: ElementRef;

ExportTOExcel()
{
  const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
  /* save to file */
  XLSX.writeFile(wb, 'Pagagon Water System.xlsx');
  
}
  ngAfterViewInit() {
    this.datasource.paginator = this.paginator;
  }
  deviceHistory:any;
deviceHistoryFlag=false;
// fromDate="";
// toDate="";
deviceId="";
data:any;
p:any=1;
tdsCount:any;
slectedSensor:any ;
machineIds: any = [];
selectedDate:any = new Date();
fromDate:any=new Date().toISOString().slice(0,10);
toDate:any=new Date().toISOString().slice(0,10);

 
  ngOnInit(){

     this.selectedDate =new Date().toISOString().substring(0,10);
    this.getSensorList();

  
      //  this.updateSubscription = interval(60000).subscribe(
      //  (val) => { this.getSensorList()});
    
    let frdt=new Date();
    frdt.setFullYear(frdt.getFullYear()-1);
    this.minV=frdt.toISOString().slice(0,10);
    let todt = new Date();
        todt.setFullYear(todt.getFullYear()-1);
    this.minV = todt.toISOString().slice(0,10);
  
  }
  getSensorList() {
  
    this.authService.getSensorList().subscribe((data: any) => {
      console.log(data);
      this.machineIds = data;
      this.slectedSensor=this.machineIds[0];
      console.log("selected sensor",this.slectedSensor);
      this.slectedSensor=this.machineIds[0];
      this.getDeviceHistoryByDate();
    }, () => {
    })
  }
  getDeviceHistoryByDate(){
  
    this.authService.getDeviceHistory(this.slectedSensor.deviceId,this.fromDate,this.toDate).subscribe(data => {  
      this.data = data;
      this.datasource = new MatTableDataSource<PeriodicElement>(this.data);
      this.datasource.paginator = this.paginator;
      this.tdsCount=this.data.lenght;
      console.log("no of tds data :",this.tdsCount);
      console.log(this.data);
 
          }, error => console.error(error));
  }
}

