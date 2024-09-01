export class OctopusPrice {
    valid_from: string;
    valid_to: string;
    value_inc_vat: number;
}

export class OctopusResult {
    results: Array<OctopusPrice>
}