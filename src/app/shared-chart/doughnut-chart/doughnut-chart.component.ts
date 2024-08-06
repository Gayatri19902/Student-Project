import { Component } from '@angular/core';
import {AfterViewInit, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import * as Echarts from 'echarts/core';
import {CanvasRenderer} from 'echarts/renderers';
import {PieChart} from 'echarts/charts'
import {
  GraphicComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  TransformComponent,
  VisualMapComponent
} from 'echarts/components';
import {LabelLayout, UniversalTransition} from 'echarts/features';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit, AfterViewInit{
  /**
   * It is a static values, Used to draw chart until the api response is received.
   */
  @Input() chartData: { value: number, name: string }[];

  /**
   * It is a image to represent in center.
   */
  @Input() chartImage: string;

  @Input() chartStyle: { [klass: string]: any; } = {width: '90%', height: '400px'};

  /**
   * It is an identifier id for chart. Must be unique.
   */
  @Input() chartId: string;
  @Input() loadGraph: boolean = false;

  /**
   * Title of the chart.
   */
  @Input() title: string;


  /**
   * Colors to be display on different items of chart.
   */
  @Input() themeColors: string[] = [
    '#068FFF',
    '#00C4FF',
    '#11009E',
    '#1C7094'
  ];

  @Input('chartOptions') options: any;

  /*@Input() options: Echarts.ComposeOption<PieSeriesOption | TitleComponentOption
    | DatasetComponentOption | TooltipComponentOption | LegendComponentOption>;*/
  chart: Echarts.EChartsType;

  @ViewChild('image') imageRef: ElementRef;
  @ViewChild('donutChart') donutChartRef: ElementRef;

  constructor(  ) {
    Echarts.use([
      CanvasRenderer,
      PieChart,
      TooltipComponent,
      VisualMapComponent,
      TitleComponent,
      LabelLayout,
      UniversalTransition,
      TransformComponent,
      LegendComponent,
      GraphicComponent]);
  }
  ngOnInit(): void {
    if (this.options == null) {
      console.log('Empty options in doughnut chart');
      this.options = this.getDefaultOptions();
    }
    if (this.title) {
      this.options.title = {
        ...this.options.title,
        name: this.title,
      };
    }
    if (this.chartImage) {
      this.options.series[0].chartImage = this.chartImage;
    }
    if (this.chartData && this.chartData.length > 0) {
      this.options.series[0].data = this.chartData;
    }
    if (this.themeColors) {
      this.options.series[0].color = this.themeColors;
    }
  }

  ngAfterViewInit(): void {
  this.chart = Echarts.init(document.getElementById(this.chartId));
  // console.log('Chart Options: ', this.options);
  this.chart.setOption(this.options);
  }

//   ngOnChanges(){
//    this.chart?.setOption(this.options)
// }

  getDefaultOptions() {
    console.log('d')
    return {
      title: {
        show: false,
        name: this.title
      },
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
      graphic: {
        elements: [
          {
            type: 'image',
            z: 3,
            style: {
              image: this.chartImage,
              width: 100,
              height: 100,
              shadowBlur: 10,
              shadowColor: 'rgb(0,0,0)'
            },
            left: 'center',
            top: '19%',
            shadowBlur: 5,
            shadowColor: '#000000',
          }
        ]
      },
      tooltip: {
        trigger: 'item',
        // @ts-ignore
        formatter: (params) => {
          console.log('Params Cart Data: ', params);
          return `${params.seriesName}</br>${params.marker}${params.data.name} : <b>${params.value}</b><br />`
        }
      },
      series: [
        {
          name: this.title,
          type: 'pie',
          radius: '50%',
          center: ['50%', '30%'],
          data: this.chartData,
          color: ['#11009E', '#068FFF', '#00C4FF','#1C7094'],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            formatter: '{d}%',
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
  /**
   * This function is ued to resize the charts.
   * @param event
   */
  onResize(event: any) {
    console.log('OnResize Event: ', event);
    if (this.chart == null) return;
    this.chart.resize();
  }

}
