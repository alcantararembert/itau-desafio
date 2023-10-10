import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-more',
  templateUrl: './button-more.component.html',
  styleUrls: ['./button-more.component.css']
})
export class ButtonMoreComponent implements OnInit {
  @Input() moreProducts : boolean = false;
  
  constructor() {}

  ngOnInit(): void {
  }
}
