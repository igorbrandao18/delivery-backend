export class UpdateMenuDto {
  readonly name?: string;
  readonly description?: string;
  readonly sections?: SectionDto[];
}

export class SectionDto {
  readonly id: number;
  readonly name: string;
  readonly description?: string;
  readonly position: number;
  readonly visible: number;
  readonly images: ImageDto[];
  readonly items: ItemDto[];
}

export class ImageDto {
  readonly id: number;
  readonly image: string;
}

export class ItemDto {
  readonly id: number;
  readonly name: string;
  readonly description?: string;
  readonly price: number;
  readonly position: number;
  readonly visible: number;
  readonly availabilityType: string;
  readonly sku: string;
  readonly images: ImageDto[];
  readonly available: boolean;
  readonly modifiers?: ModifierDto[];
}

export class ModifierDto {
  readonly id: number;
  readonly name: string;
  readonly minChoices: number;
  readonly maxChoices: number;
  readonly items: ModifierItemDto[];
}

export class ModifierItemDto {
  readonly id: number;
  readonly name: string;
  readonly price: number;
  readonly maxChoices: number;
  readonly visible: number;
  readonly availabilityType: string;
  readonly available: boolean;
}
