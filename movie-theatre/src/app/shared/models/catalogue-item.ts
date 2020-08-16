export interface ICatalogueItem {
  name: string;
  id: number;
  price: number;
  imageUrl: string;
  description: string;
  discount?: {
    quantityForDiscount: number;
    calculatedQuantity: number;
    discountDescription: string;
  };
}

export interface IRequestBody {
  items: IRequestBodyItem[];
  totalCost: number;
}

export interface IRequestBodyItem {
  id: number;
  amount: number;
  cost: number;
}

export class CatalogueItem {
  public static parse(proto: ICatalogueItem): CatalogueItem {
    return new CatalogueItem(
      proto.id,
      proto.name,
      proto.price,
      proto.imageUrl,
      proto.description,
      proto.discount && proto.discount.discountDescription,
      proto.discount && proto.discount.quantityForDiscount,
      proto.discount && proto.discount.calculatedQuantity,
      );
  }

  public static deparse(items: CatalogueItem[]): IRequestBodyItem[] {
    return items.map(item => ({
      id: item.id,
      amount: item.amount,
      cost: item.cost,
    }));
  }

  private _cost: number;

  private _amount: number;

  private _isDiscount: boolean;

  public get id(): number {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get price(): number {
    return this._price;
  }

  public get imageUrl(): string {
    return this._imageUrl;
  }

  public get description(): string {
    return this._description;
  }

  public get discountDescription(): string {
    return this._discountDescription;
  }

  public get cost(): number {
    return this._cost;
  }

  public get amount(): number {
    return this._amount;
  }

  public get isDiscount(): boolean {
    return this._isDiscount;
  }

  constructor(
    private _id: number,
    private _name: string,
    private _price: number,
    private _imageUrl: string,
    private _description: string,
    private _discountDescription: string = null,
    private _quantityForDiscount: number = null,
    private _calculatedQuantity: number = null,
  ) {
    this._cost = 0;
    this._amount = 0;
    this._isDiscount = Boolean(this._discountDescription);
  }

  public setItemsAmountAndCost(amount: number): void {
    this._amount = amount;
    this._cost = this.calculateCost(amount);
  }

  private calculateCost(amount: number): number {
    if (this._isDiscount && amount >= this._quantityForDiscount) {
      const standardPriceItems = amount % this._quantityForDiscount;
      const discountNumber = (amount - standardPriceItems) / this._quantityForDiscount;
      return this._calculatedQuantity * this._price * discountNumber + standardPriceItems * this._price;
    }
      return amount * this._price;
  }
}
