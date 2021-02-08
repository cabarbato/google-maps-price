export interface PriceDetail {
    data: {
        result: {
            price_level: string
        }
    }
}

export interface PlaceId {
    data: {
        predictions: {
            place_id: string
        }[]
    }
}