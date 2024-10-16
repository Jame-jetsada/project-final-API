export class probDto {
    prob_type_id: string;
    type_name: string;
}

export class createProblemDto {
    prob_name: string;
    prob_type: number;
    prob_item: number;
    prob_detail: string;
    prob_image: string[];
    create_by: string;
    site_id: string;
    site_desc: string;
}

export class updateStatusDto {
    id: string;
    name: string;
}