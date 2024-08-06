import {Component, OnInit} from '@angular/core';
import {viewDashboardDataList, viewDashboardList} from "../../DTO/view-dashboard";
import {ViewDashboardService} from "./view-dashboard.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-view-dashboard',
  templateUrl: './view-dashboard.component.html',
  styleUrls: ['./view-dashboard.component.scss']
})
export class ViewDashboardComponent implements OnInit {
  viewDashboardData: viewDashboardDataList;
  dashboardStudentChartData: { name: string, value: number }[];
  dashboardAmountChartData: { name: string, value: number }[];
  load :boolean;
  activeStudent: any;
  inactiveStudent: any;
  conservation: any;
  Expenditure: any;
  pettyCash: any;
  total: any;
  loading=true;

  constructor(private viewdashboardservice: ViewDashboardService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.checkUser();
  }
  checkUser(){
    if(localStorage.getItem('user') !== null){
      this.getData();
    }else{
      this.router.navigate(['/']);
    }
  }
  getData() {
    this.viewdashboardservice.getData().subscribe(x => {
      if (x.success) {
        // console.log(x.message);
        this.viewDashboardData = x.message;
        // console.log(this.dashboardDataInfo);
        // console.log(this.dashboardDataInfo.students);
        const arrAS = [];
        const objAS1 = {name: 'Active Students', value: this.viewDashboardData.activeStudents};
        const objAS2 = {name: 'Inactive Students', value: this.viewDashboardData.inactiveStudents};
        arrAS.push(objAS1, objAS2);
        this.dashboardStudentChartData = arrAS;
        this.activeStudent = this.dashboardStudentChartData[0]
        this.inactiveStudent = this.dashboardStudentChartData[1]

        // console.log(arrAS);
        console.log(this.dashboardStudentChartData);
        const arrAmount = [];
        const objExp = {name: 'Expenditure', value: this.viewDashboardData.expenditure};
        const objPetty = {name: 'Petty-Cash', value: this.viewDashboardData.pettyCash};
        const objCons = {name: 'Conservation', value: this.viewDashboardData.conservation};
        const totalAmount = {name: 'total Amount', value: this.viewDashboardData.total};
        arrAmount.push(objExp, objPetty, objCons, totalAmount);
        this.dashboardAmountChartData = arrAmount
        // console.log(arrAmount);
        this.conservation = this.dashboardAmountChartData[2];
        this.Expenditure = this.dashboardAmountChartData[0]
        this.pettyCash = this.dashboardAmountChartData[1]
        this.total = this.dashboardAmountChartData[3]
        console.log(this.dashboardAmountChartData)
        this.load = true;
       this.loading=false;
      }
    });
  }

  getStudentChartOptions() {
    return {
      legend: {
        show: false,
        type: 'scroll',
        orient: 'vertical',
        top: '60%',
        bottom: 10,
        pageIconColor: '#000000',
        pageTextStyle: {
          color: '#000000',
          fontFamily: 'Poppins'
        },
        textStyle: {
          color: '#000000',
          fontFamily: 'Poppins'
        }
      },
      title: {
        show: false,
        name: 'Students'
      },
      graphic: {
        elements: [
          {
            type: 'image',
            z: 3,
            style: {
              image: '/assets/student.png',
              width: 100,
              height: 100,
              shadowBlur: 10,
              shadowColor: 'rgb(0,0,0)'
            },
            left: 'center',
            top: '18%',
            shadowBlur: 5,
            shadowColor: '#000000',
          }
        ]
      },
      tooltip: {
        trigger: 'item',
        // @ts-ignore
        formatter: (params) => {
          //console.log('Params Shareholder: ', params);
          return `${params.seriesName}</br>${params.marker}${params.data.name} : <b>${params.value}</b><br />`
        }
      },
      series: [
        {
          name: 'Students',
          type: 'pie',
          radius: '50%',
          center: ['50%', '30%'],
          data: this.dashboardStudentChartData,
          color: ['#11009E', '#00C4FF'],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            formatter: '{c}',
            color: 'rgb(0,0,0)',
            overflow: 'truncate',
          },
          labelLine: {
            lineStyle: {
              color: 'rgb(0,0,0)',
              type: 'dashed'
            },
          },
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0,0,0,0.5)',
          },
        }
      ],
      textStyle: {
        overflow: 'break'
      }
    };
  }

  getAmountChartOptions() {

    return {
      legend: {
        show: false,
        type: 'scroll',
        orient: 'vertical',
        top: '60%',
        bottom: 10,
        pageIconColor: '#000000',
        pageTextStyle: {
          color: '#000000',
          fontFamily: 'Poppins'
        },
        textStyle: {
          color: '#000000',
          fontFamily: 'Poppins'
        }
      },
      title: {
        show: false,
        name: 'Amount'
      },
      graphic: {
        elements: [
          {
            type: 'image',
            z: 3,
            style: {
              image: '/assets/amount.png',
              width: 100,
              height: 100,
              shadowBlur: 10,
              shadowColor: 'rgb(0,0,0)'
            },
            left: 'center',
            top: '18%',
            shadowBlur: 5,
            shadowColor: '#000000',
          }
        ]
      },
      tooltip: {
        trigger: 'item',
        // @ts-ignore
        formatter: (params) => {
          //console.log('Params Shareholder: ', params);
          return `${params.seriesName}</br>${params.marker}${params.data.name} : <b>${params.value}</b><br />`
        }
      },
      series: [
        {
          name: 'Amount',
          type: 'pie',
          radius: '50%',
          center: ['50%', '30%'],
          data: this.dashboardAmountChartData,
          color: ['#11009E' , '#00C4FF','#068FFF','#1C7094'],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            formatter: '{c}',
            color: 'rgb(0,0,0)',
            overflow: 'truncate',
          },
          labelLine: {
            lineStyle: {
              color: 'rgb(0,0,0)',
              type: 'dashed'
            },
          },
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0,0,0,0.5)',
          },
        }
      ],
      textStyle: {
        overflow: 'break'
      }
    };
}

}
