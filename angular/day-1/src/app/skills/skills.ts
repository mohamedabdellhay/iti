import { Component } from '@angular/core';
import { Skill } from '../skill/skill';

@Component({
  selector: 'app-skills',
  imports: [Skill],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {
  skills: { title: string; degree: number }[] = [
    { title: 'html', degree: 60 },
    { title: 'Js', degree: 90 },
    { title: 'Angular', degree: 80 },
    { title: 'Css', degree: 70 },
    { title: 'Java', degree: 50 },
    { title: 'Spring', degree: 40 },
    { title: 'Git', degree: 60 },
    { title: 'Docker', degree: 30 },
    { title: 'Kubernetes', degree: 20 },
  ];
}
