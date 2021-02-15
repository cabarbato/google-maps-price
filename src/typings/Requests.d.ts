export interface PriceDetailType {
    data: {
        result: {
            price_level: string
        }
    }
}

export interface PlaceIdType {
    data: {
        predictions: {
            place_id: string
        }[]
    }
}