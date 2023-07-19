import { Component, OnInit, AfterViewInit, ViewChild,ElementRef } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import{NgFor} from '@angular/common';
import {} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
 import * as XLSX from 'xlsx';

export interface DeviceElement {deviceId:string;
  customerName:string; status:string; custAddress:string; 
}
@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
  standalone: true,
  imports:[
    NgFor, MatTableModule, MatPaginatorModule
    
  ]
})
export class DeviceComponent {
  devicelist:any;
  sensorDetails = false;
  constructor(private authService: AuthService) {  }
  displayedColumns: string[] = ['deviceId','customerName', 'status','custAddress'];
  @ViewChild(MatPaginator) paginator: any ;
  datasource = new MatTableDataSource<DeviceElement>([]);

  @ViewChild('TABLE')
  table!: ElementRef;

ExportTOExcel()
{
  const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
  /* save to file */
  XLSX.writeFile(wb, 'SheetJS.xlsx');
  
}
  ngAfterViewInit() {
    this.datasource.paginator = this.paginator;
  }
  ngOnInit(){
    this.getSensorList();
  }
getSensorList(){
  this.authService.getSensorList().subscribe((data: any) => {
    console.log(data);
    this.devicelist = data;
    this.datasource = new MatTableDataSource<DeviceElement>(this.devicelist);
    this.datasource.paginator = this.paginator;
    console.log("selected sensor",this.devicelist);
  }, () => {
  })
}

}
