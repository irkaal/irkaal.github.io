import { Component, OnInit } from '@angular/core';

interface Project {
  title?: string;
  description?: string;
  tools?: string[],
  homepage?: string,
  repo?: string,
  thumbnail?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  public projects: Project[][];
  public osProjects: Project[][];

  constructor() { }

  ngOnInit(): void {
    this.projects = [
      [
        {
          title: 'Random Pantry',
          description: `
            A web app for recommending recipes based on user's ratings in Python using Collaborative Filtering and Django.
            Random Pantry allows user to track their favorite recipes and discover new ones that they might enjoy.
          `,
          tools: ['Python', 'Django', 'Scikit-learn'],
          homepage: 'https://randompantry.herokuapp.com/',
          repo: 'https://github.com/irkaal/randompantry',
          thumbnail: 'assets/home/randompantry.webp'
        },
        {
          title: 'San Francisco Crime Classification',
          description: `
            In this project, I cleaned the crime dataset, performed feature encoding and engineering,
            and trained an XGBoost classifier using Python. The final model performed as well as the top 5% models on Kaggle.
            I presented the project poster at B.C.’s AI Showcase 2019.
          `,
          tools: ['Python', 'Scikit-learn', 'XGBoost', 'HYPEROPT'],
          repo: 'https://github.com/irkaal/sf-crime',
          thumbnail: 'assets/home/sf-crime.webp'
        }
        
      ],
      [
        {
          title: 'User Segmentation (Winners of Challenge 2)',
          description: `
            In this hackathon project, I worked collaboratively to segment users into meaningful groups based on their comments on Hacker News.
            Our winning solution can guide business decisions to better target audiences and increase active time.
          `,
          tools: ['R', 'Tidyverse', 'Tidytext', 'tm', 'topicmodels', 'textutils'],
          homepage: 'https://youtu.be/Qzt9RwdRtJk',
          repo: 'https://github.com/irkaal/whyR_challenge2',
          thumbnail: 'assets/home/hackathon2020.webp'
        },
        {
          title: 'COVID-19 Dashboard',
          description: `
            A web app for tracking and visualizing the spread of COVID-19 around the world.
            Data is obtained from Johns Hopkins University and is automatically refreshed every 12 hours.
          `,
          tools: ['R', 'Tidyverse', 'Shiny'],
          homepage: 'https://irkaal.shinyapps.io/covid-19',
          repo: 'https://github.com/irkaal/covid-19',
          thumbnail: 'assets/home/covid-19.webp'
        }
      ]
    ];

    this.osProjects = [
      [
        {
          title: 'triangulr',
          description: `
            A high-performance triangular distribution functions in C++ using Rcpp with efficient memory usage.
            Triangulr provides a fast and robust random variate generator for performing simulations efficiently.
          `,
          tools: ['C++', 'R', 'Rcpp', 'dqrng', 'rlang', 'vctrs'],
          homepage: 'https://irkaal.github.io/triangulr',
          repo: 'https://github.com/irkaal/triangulr',
          thumbnail: 'assets/home/logo.webp'
        },
        {
          title: 'tidymodels',
          description: `
            The tidymodels framework is a collection of R packages for modeling and machine learning using tidyverse principles.
          `,
          tools: ['R', 'parsnip', 'recipes', 'broom', 'dials'],
          homepage: 'https://www.tidymodels.org',
          repo: 'https://github.com/tidymodels',
          thumbnail: 'assets/home/tidymodels_hex.webp'
        }
      ]
    ];
  }
}
