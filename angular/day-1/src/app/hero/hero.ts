import { Component } from '@angular/core';
import { DownloadCv } from '../download-cv/download-cv';

@Component({
  selector: 'app-hero',
  imports: [DownloadCv],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {}
