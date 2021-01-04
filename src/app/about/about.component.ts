import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { BaseChartDirective, Label } from 'ng2-charts';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    elements: { line: { tension: 0 } },
    responsive: true,
    scales: { xAxes: [{ type: 'time', time: { unit: 'month' } }] },
  };
  public lineChartColors = [
    {
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    },
  ];
  @ViewChild(BaseChartDirective, { static: true })
  public chart: BaseChartDirective | undefined;
  public pinnedRepos: { name: string; description: string }[] | undefined;

  constructor(private _httpClient: HttpClient) {}

  ngOnInit(): void {
    this._httpClient
      .get('https://cors-anywhere.herokuapp.com/https://github.com/irkaal', {
        responseType: 'text',
      })
      .subscribe(
        (htmlText: string) => {
          const parser = new DOMParser();
          const docHtml: Document = parser.parseFromString(
            htmlText,
            'text/html'
          );
          this.updateLineChart(docHtml);
          this.updatePinned(docHtml);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  private updateLineChart(docHtml: Document): void {
    const rects = docHtml.getElementsByTagName('rect');
    const timestamps = Array.from(rects).map(
      (rect: SVGRectElement) =>
        rect.attributes.getNamedItem('data-date')?.nodeValue as string
    );
    const contributions = Array.from(rects).map((rect: SVGRectElement) =>
      Number(rect.attributes.getNamedItem('data-count')?.nodeValue)
    );
    const dateToSkip = new Date(timestamps[0]);
    const monthYearToSkip = `${dateToSkip.getMonth()}_${dateToSkip.getUTCFullYear()}`;
    const data = timestamps.reduce(
      (data: any, dateString: string, index: number) => {
        const date = new Date(`${dateString}T00:00`);
        const monthYear = `${date.getMonth()}_${date.getUTCFullYear()}`;
        if (monthYear === monthYearToSkip) {
          return data;
        }
        if (monthYear in data) {
          data[monthYear].push(contributions[index]);
        } else {
          data[monthYear] = [contributions[index]];
        }
        return data;
      },
      {}
    );
    const monthlyTimestamps = Object.keys(data).map((key: string) => {
      const [month, year] = key.split('_');
      return new Date(Number(year), Number(month), 1, 0, 0)
        .toISOString()
        .split('T')[0];
    });
    const totalContributions = Object.values(data).map((value: any) =>
      value.reduce((acc: number, curr: number) => acc + curr, 0)
    );

    this.lineChartLabels = monthlyTimestamps;
    this.lineChartData = [
      { data: totalContributions, label: 'Total Contributions' },
    ];
  }

  private updatePinned(docHtml: Document): void {
    const repoNames: string[] = Array.from(
      docHtml.getElementsByClassName('repo')
    ).map((span: Element) => span.innerHTML.trim());
    const repoDescriptions: string[] = Array.from(
      docHtml.getElementsByClassName('pinned-item-desc')
    ).map((p: Element) => p.innerHTML.trim());

    this.pinnedRepos = repoNames.map((name: string, index: number) => ({
      name: name,
      description: repoDescriptions[index],
    }));
  }
}
