import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})


export class ChildComponent {
  @Input() info = '';
  @Output() newItemEvent = new EventEmitter<string>();
  profileForm = new FormGroup({
    textInput: new FormControl(''),
  });
  items: string[] = [];

   

  addNewItem(value: string) {
    this.newItemEvent.emit(value);
    this.profileForm.controls.textInput.reset();
  }

  

}
