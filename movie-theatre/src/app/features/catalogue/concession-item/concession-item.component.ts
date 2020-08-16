import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { CatalogueItem } from '@app-shared/models';


@Component({
  selector: 'app-concession-item',
  templateUrl: './concession-item.component.html',
  styleUrls: ['./concession-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConcessionItemComponent extends OnDestroyMixin implements OnInit {
  @Input()
  public item: CatalogueItem;

  @Output()
  public amountChangeEmitter: EventEmitter<number>;

  private _amountControl: FormControl;
  public get amountControl(): FormControl {
    return this._amountControl;
  }

  private readonly _BUTTON_REMOVE_ICON = 'remove_shopping_cart';
  private readonly _BUTTON_ADD_ICON = 'add_shopping_cart';

  private readonly _INITIAL_AMOUNT = 0;

  private _amount: number;
  public get amount(): number {
    return this._amount;
  }

  private _buttonText: string;
  public get buttonText(): string {
    return this._buttonText;
  }

  private _buttonIcon: string;
  public get buttonIcon(): string {
    return this._buttonIcon;
  }

  constructor() {
    super();
    this._amount = this._INITIAL_AMOUNT;
    this._buttonIcon = this._BUTTON_REMOVE_ICON;
    this.amountChangeEmitter = new EventEmitter();
  }

  public ngOnInit(): void {
    this._amountControl = new FormControl(this._INITIAL_AMOUNT);

    this._amountControl.valueChanges
      .pipe(untilComponentDestroyed(this))
      .subscribe((amount: number) => {
        this._buttonIcon = amount ? this._BUTTON_ADD_ICON : this._BUTTON_REMOVE_ICON;
      });
  }

  public onButtonClick(): void {
    this._amount = this._amountControl.value;
    this.amountChangeEmitter.emit(this._amount);
  }
}
