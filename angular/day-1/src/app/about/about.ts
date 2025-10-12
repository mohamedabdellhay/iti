import { Component } from '@angular/core';
import { DownloadCv } from '../download-cv/download-cv';

@Component({
  selector: 'app-about',
  imports: [DownloadCv],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {}
