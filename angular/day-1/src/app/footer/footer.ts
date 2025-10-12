import { Component } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCoffee, faSmile } from '@fortawesome/free-solid-svg-icons'; // Example: Importing a solid icon
@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
})
export class Footer {
  constructor(library: FaIconLibrary) {
    // Add the imported icons to the library
    library.addIcons(faCoffee, faSmile);
  }
}
