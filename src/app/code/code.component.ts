import { Component, OnInit } from '@angular/core';

interface ProjectItem {
  name: string;
  description: string;
  homepage?: string;
  repository: string;
  image: string;
}

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
})
export class CodeComponent implements OnInit {
  public projectItems: ProjectItem[] = [
    {
      name: 'Random Pantry 3',
      description: `
      Random Pantry 3 is an ongoing recipe sharing platform project that
      leverages machine learning algorithms (collaborative filtering and
      Truncated SVD with nearest neighbors) to provide personalized
      recipes recommendations to each user. This is a complete rewrite of
      Random Pantry in Python and TypeScript which aims to resolve
      problems and limitations that exist in the previous version.
      `,
      repository: 'https://github.com/irkaal/randompantry3',
      image: 'assets/randompantry3.webp',
    },
    {
      name: 'Recruit Restaurant Visitor Forecasting',
      description: `
      In this ongoing project, I predicted how many future visitors a
      restaurant will receive using Random Forest, SARIMA and Gradient
      Boosting Machines in Python and R.
      `,
      repository:
        'https://github.com/irkaal/recruit-restaurant-visitor-forecasting',
      image: 'assets/recruit-restaurant-visitor-forecasting.webp',
    },
    {
      name: 'Food.com - Recipes and Reviews',
      description: `
      This kaggle dataset is over 1GB in size and contains data on over 500,000
      recipes and 1,400,000 reviews from Food.com site. The collection
      methodology is web scraping with rvest in R combined with furrr which
      allows for parallel execution of mapping functions using future.
      This is the main dataset used in Random Pantry 3.
      `,
      homepage: 'https://www.kaggle.com/irkaal/foodcom-recipes-and-reviews',
      repository: 'https://github.com/irkaal/foodcom-recipes-and-reviews',
      image: 'assets/foodcom-recipes-and-reviews.webp',
    },
    {
      name: 'Triangulr',
      description: `
      The goal of this package is to be a high-performance alternative to
      the popular triangle package in R. Triangulr provides functions for
      the triangular distribution that are implemented in C++ with support
      for Xoroshiro128+ random generator through the dqrng package.
      Currently, I am continuously maintaining and improving the package.
      `,
      homepage: 'https://irkaal.github.io/triangulr',
      repository: 'https://github.com/irkaal/triangulr',
      image: 'assets/triangulr.webp',
    },
    {
      name: 'User Segmentation (Winners of Challenge 2)',
      description: `
      In this hackathon project, I worked collaboratively to segment users
      into meaningful groups based on their comments on Hacker News. This
      winning solution can guide business decisions to better target audiences
      and increase active time.
      `,
      homepage: 'https://irkaal.github.io/user-segmentation',
      repository: 'https://github.com/irkaal/user-segmentation',
      image: 'assets/user-segmentation.webp',
    },
    {
      name: 'San Francisco Crime Classification',
      description: `
      Before San Francisco’s technological and financial upturn, there was
      actually a high rate in criminal activities. In this Application Bake
      Off project, we have over 12 years of crime reports from across all of
      San Francisco's neighborhoods, and we compare various Machine Learning
      algorithms and their abilities to predict crime based on time and location.
      The final model performed as well as the top 5% models on Kaggle.
      I presented the project poster at B.C.’s AI Student Showcase 2019.
      `,
      homepage: 'https://irkaal.github.io/sf-crime',
      repository: 'https://github.com/irkaal/sf-crime',
      image: 'assets/sf-crime.webp',
    },
    {
      name: 'Tidymodels',
      description: `
      Contributed to open-source packages in the tidymodels framework. These
      packages provide tools for modeling and machine learning using tidyverse
      principles in R.
      `,
      repository: 'https://github.com/tidymodels',
      image: 'assets/tidymodels.webp',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
