import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-qty-btn',
  templateUrl: './qty-btn.component.html',
  styleUrls: ['./qty-btn.component.css'],
})
export class QtyBtnComponent implements OnInit {
  @Input() Quantity: number = 1;

  @Output() changeQuantity: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  changeQty(addQty: boolean = true) {

    if (!addQty && this.Quantity == 1) {
      this.Quantity = this.Quantity;
    } else if (!addQty && this.Quantity > 1) {
      this.Quantity = this.Quantity - 1;
    } else if (addQty) {
      this.Quantity = this.Quantity + 1;
    }

    this.changeQuantity.emit(this.Quantity);
  }
}
