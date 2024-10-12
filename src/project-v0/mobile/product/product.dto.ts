export class CountProductsDto {
    firstname: string;
    lastname: string;
    site_id: string;
    item_id: string;
    item_qty: number;
    item_position: string;
}

export class GetItemDetailDto {
    site_id: string;
    item_id: string;
    item_barcode: string;
}

export class GetCountProductDto {
    site_id: string;
    filters_item_position: string;
}

export class getItemByShelfDto {
    site_id: string;
    item_position: string;
}
