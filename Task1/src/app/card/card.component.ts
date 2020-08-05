import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Card} from '../app.component';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})


export class CardComponent implements OnInit {

  @Input() card: Card;
  @Output() editCard = new EventEmitter<Card>();
  @Output() deleteCard = new EventEmitter<Card>();

  name: string;

  ngOnInit(): void {
    this.name = this.card.firstName.trim();

    !!this.name ?
      this.name = this.name.concat(' ', this.card.lastName.trim())
      :
      this.name = this.card.lastName.trim();
  };

  editThisCard(): void {
    this.editCard.emit(this.card);
  }

  deleteThisCard(): void {
    this.deleteCard.emit(this.card);
  }

};
