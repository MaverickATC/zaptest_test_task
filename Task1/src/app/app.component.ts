import {Component, OnInit} from '@angular/core';
import {HttpService} from './http.service';

export interface Card {
  ID: number;
  phoneNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  notes: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HttpService]
})

export class AppComponent implements OnInit{
  title = 'zaptestquizz';

  cards: Card[] = [];

  activeCard: Card;

  constructor(private httpService: HttpService){}

  addItem(newItem: Card): void {
    const checkID = this.cards.filter((item) => (item.ID === newItem.ID));
    if (!checkID.length){
      this.cards.unshift(newItem);
      return;
    };
    const index = this.cards.indexOf(checkID[0]);
    this.cards[index] = newItem;
  };

  setActiveCard(newCard: Card): void {
    this.activeCard = newCard;
  };

  deleteCard(card: Card): void {
    const index = this.cards.indexOf(card);
    this.cards.splice(index, 1);
  }

  ngOnInit(){
    this.httpService.getUsers().subscribe(data => this.cards = data);
  }

}
