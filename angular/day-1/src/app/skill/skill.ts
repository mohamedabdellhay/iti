import { Component, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-skill',
  imports: [],
  templateUrl: './skill.html',
  styleUrl: './skill.css',
})
export class Skill {
  @Input() skillElement: { title: string; degree: number } | undefined;
}
