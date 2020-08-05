import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Card} from '../app.component';

function validateName(formGroup): any {
  const nameF = formGroup.get('firstName').value;
  const nameL = formGroup.get('lastName').value;
  const validated = !((nameF && nameF.trim() !== '') || (nameL && nameL.trim() !== ''));
  return ( validated ? {nameExists: true} : null);
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit, OnChanges {

  @Output() newCard = new EventEmitter<Card>();
  @Input() inputCard: Card;

  ID: number = null;

  cardForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    notes: new FormControl(''),
  }, {validators: validateName});

  ngOnInit(): void {
    if (this.inputCard)
    {
      this.cardForm.get('firstName').setValue(this.inputCard.firstName);
      this.cardForm.get('lastName').setValue(this.inputCard.lastName);
      this.cardForm.get('phone').setValue(this.inputCard.phoneNumber);
      this.cardForm.get('email').setValue(this.inputCard.email);
      this.cardForm.get('notes').setValue(this.inputCard.notes);
      this.ID = this.inputCard.ID;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.inputCard.currentValue) {
      this.cardForm.get('firstName').setValue(changes.inputCard.currentValue.firstName);
      this.cardForm.get('lastName').setValue(changes.inputCard.currentValue.lastName);
      this.cardForm.get('phone').setValue(changes.inputCard.currentValue.phoneNumber);
      this.cardForm.get('email').setValue(changes.inputCard.currentValue.email);
      this.cardForm.get('notes').setValue(changes.inputCard.currentValue.notes);
      this.ID = changes.inputCard.currentValue.ID;
    }
  }


  addItem(): void {

    if (this.cardForm.valid) {
      const card: Card = {
        ID: this.ID || new Date().getTime(),
        phoneNumber: this.cardForm.controls.phone.value,
        email: this.cardForm.controls.email.value,
        firstName: this.cardForm.controls.firstName.value,
        lastName: this.cardForm.controls.lastName.value,
        notes: this.cardForm.controls.notes.value
      };
      this.newCard.emit(card);
      this.cardForm.reset();
    } else {
      alert('form error: phone required(only numbers), ' +
        'first or last name required, ' +
        'email required and should be valid email');
    }
  }

}
