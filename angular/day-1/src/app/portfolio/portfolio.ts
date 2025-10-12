import { Component } from '@angular/core';
import { Projects } from '../projects/projects';

@Component({
  selector: 'app-portfolio',
  imports: [Projects],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio {
  projects: any[] = [
    {
      name: 'Project One',
      description: 'Description for project one.',
      link: '#project-one',
    },
    {
      name: 'Project Two',
      description: 'Description for project two.',
      link: '#project-two',
    },
    {
      name: 'Project Three',
      description: 'Description for project three.',
      link: '#project-three',
    },
    {
      name: 'Project Four',
      description: 'Description for project four.',
      link: '#project-four',
    },
    {
      name: 'Project Five',
      description: 'Description for project five.',
      link: '#project-five',
    },
  ];
}
