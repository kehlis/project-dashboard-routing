import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
    selector: 'pd-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.style.css']
})
export class DropdownComponent {
    @Input() options;
}
