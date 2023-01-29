import { Component, OnInit } from '@angular/core';
import { HomeService } from './services/home.service';
import { IUrl } from './url.model';
import { MatSnackBar} from '@angular/material/snack-bar'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public currentUrl: IUrl = {
    url: '',
    urlShortened: ''
  } 

  constructor(private homeService: HomeService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    
  }

  setUrl(): void {
    const urlValidation = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/

    if(urlValidation.test(this.currentUrl.url)) {
      this.snackBar.open('Estamos gerando seu link!', 'X', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })

      this.homeService.setUrlShortener(this.currentUrl.url).subscribe((data: IUrl) => {
        this.currentUrl.url = data.url
        this.currentUrl.urlShortened = data.urlShortened
      })
    } else {
      this.snackBar.open('Coloque um link que seja válido!', 'X', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
    }
  }


  copyText() {
    this.snackBar.open('Url copiada!', 'X', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })

    navigator.clipboard.writeText(this.currentUrl.urlShortened)
  }
}
