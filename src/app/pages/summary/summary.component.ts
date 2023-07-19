import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
// import { Subscription, interval } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  constructor(private authService:AuthService) { }
   //updateSubscription: Subscription = new Subscription;
  myControl = new FormControl();
  tdsData: any = {};
  tempData:any={};
  flowData:any={};
  machineIds: any = [];
  tdsDataFlag = false;
  tempDataFlag=false;
  flowDataFlag=false;
  sensorDetails = false;
  slectedSensor:any ={};
  selectedDate:any = new Date();
  fromDate:any=new Date().toISOString().slice(0,10);
  toDate:any=new Date().toISOString().slice(0,10);
  //toDate:any=new Date();
  minV:any; //"2023-07-01";
  maxV:any = new Date().toISOString().slice(0,10);
  deviceCount:any;
tdsCount:any;

  ngOnInit() {
   
   

    // ...
    this.selectedDate =new Date().toISOString().substring(0,10);
    this.getSensorList();
    this.getLiveSensorInfo();

   

      //  this.updateSubscription = interval(60000).subscribe(
      //  (val) => { this.getSensorList()});
    
    let frdt=new Date();
    frdt.setFullYear(frdt.getFullYear()-1);
    this.minV=frdt.toISOString().slice(0,10);

    let todt = new Date();
        todt.setFullYear(todt.getFullYear()-1);
    this.minV = todt.toISOString().slice(0,10);



    
  }
  getLiveSensorInfo(){
    this.authService.getliveSensorInfo().subscribe((resp:any)=>{
      console.log("Live sensor list",resp);
    })
  }
  getSensorList() {
    this.tdsDataFlag = false;
    this.tempDataFlag=false;
    this.flowDataFlag=false;
    this.authService.getSensorList().subscribe((data: any) => {
      console.log(data);
      this.machineIds = data;
      this.sensorDetails = true;
      this.deviceCount=this.machineIds.length;
      console.log("device lenght",this.deviceCount);
      this.slectedSensor=this.machineIds[0];
      console.log("selected sensor",this.slectedSensor);
      this.getSesnorData();
    }, () => {
      
    })
  }

  getSesnorData() {
    console.table(this.slectedSensor);
    this.tdsDataFlag = false;
    this.tempDataFlag=false;
    this.flowDataFlag=false;

    this.authService.getTdsSensorGrphRaw(this.slectedSensor.deviceId,this.fromDate,6).subscribe((tdsResp:any)=>{
      console.log(tdsResp);
      this.tdsData = tdsResp;
      this.tdsCount=this.tdsData.length;
      console.log("no of TDS count",this.tdsCount);
      this.tdsDataFlag = true;
    }, () => {
    }
    )
    this.authService.getTempSensorGrphRaw(this.slectedSensor.deviceId,this.selectedDate).subscribe((tempResp:any)=>{
      console.log(tempResp);
      this.tempData=tempResp;
      this.tempDataFlag = true;
    }, () => {
    }
    )

    this.authService.getFlowSensorGrphRaw(this.slectedSensor.deviceId,this.selectedDate).subscribe((flowResp:any)=>{
      console.log(flowResp);
      this.flowData=flowResp;
      this.flowDataFlag=true;
    }, ()=> {
    }
    )
  }

}