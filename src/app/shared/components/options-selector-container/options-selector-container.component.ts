import { Component, OnInit, Input, OnChanges, Output, EventEmitter, AfterViewInit, SimpleChanges } from '@angular/core';
import { MatSelectChange } from '../../../../../node_modules/@angular/material/select';

@Component({
  selector: 'app-options-selector-container',
  templateUrl: './options-selector-container.component.html',
  styleUrls: ['./options-selector-container.component.scss']
})
export class OptionsSelectorContainerComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() placeholder: string;

  @Input() data: any[] = [];

  @Output() selectedEmitter: EventEmitter<any> = new EventEmitter();

  selectedDisplay: any;

  constructor() {

  };

  ngOnInit() {

  };

  ngAfterViewInit(): void {

  };

  ngOnChanges(changes: SimpleChanges) {
    
  };

  selected(option: MatSelectChange) {
    this.selectedDisplay = this.data.find(item => item['id'] === option.value);
    this.selectedEmitter.emit(this.selectedDisplay);
  };

}
