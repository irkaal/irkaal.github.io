import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export interface Project {
  title?: string;
  description?: string;
  link?: string;
  thumbnail?: string;
  date?: Date;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  projects: Project[][];
  nCol: number;

  constructor(private http: HttpClient) {
    this.nCol = 2;
  }

  ngOnInit(): void {
    this.http.get(
      'https://api.github.com/users/irkaal/repos',
      { headers: { Accept: "application/vnd.github.mercy-preview+json"} }
    ).subscribe((data: any[]) => {
      const repos: any[] = data.filter(x => x['topics'].includes('featured'));
      const projectPromises: Promise<Project>[] = repos.map(toProjectPromise);
      Promise.all(projectPromises).then((projects: Project[]) => {
        projects.sort(compareDates);
        this.projects = projects.reduce(reduceToMatrix, [[]]);
      });
    });

    const toProjectPromise: (repo: any) => Promise<Project> = (repo: any): Promise<Project> => {
      return new Promise((resolve, reject) => {
        this.http.get(
          `https://raw.githubusercontent.com/irkaal/${repo['name']}/master/README.md`,
          { responseType: 'blob' }
        ).subscribe(
          (data: Blob) => {
            const tools: string[] = repo['topics'].filter(x => x != 'featured');
            tools.sort((a: string, b: string) => a.includes('-lang') ? -1 : b.includes('-lang') ? 1 : 0 );
            data.text().then((readme: string) =>
              resolve({
                title: /#(.*?)\n/.exec(readme)[1].trim(),
                description: repo['description'],
                tools: tools.map((x: string) => x.replace('-lang', '')),
                homepage: repo['homepage'],
                repo: repo['html_url'],
                thumbnail: `${repo['html_url']}/raw/master/${repo['html_url'].split('/').pop()}.png`,
                date: new Date(repo['pushed_at'])
              } as Project)
            );
          },
          (error: any) => reject(error)
        );
      });
    };

    const compareDates: (a: Project, b: Project) => number = (a: Project, b: Project) => {
      return new Date(b['date']).getTime() - new Date(a['date']).getTime();
    };

    const reduceToMatrix: (
      projectMatrix: Project[][], project: Project, index: number, projects: Project[]
    ) => Project[][] = (projectMatrix: Project[][], project: Project, index: number, projects: Project[]) => {
      if (index % this.nCol === 0 && index !== 0) {
        projectMatrix.push([]);
      }
      projectMatrix[projectMatrix.length - 1].push(project);
      const currentRow: Project[] = projectMatrix[projectMatrix.length - 1];
      const isLastRow: boolean = index === projects.length - 1;
      if (isLastRow && currentRow.length !== this.nCol) {
        currentRow.push(...Array(this.nCol - currentRow.length).fill({}));
      }
      return projectMatrix;
    };
  }
}
