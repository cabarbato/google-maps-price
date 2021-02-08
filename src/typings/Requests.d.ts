export interface ThrowError {
    response: {
        data: {
            error_message: string
        }
    }

}

export interface PriceDetail {
    data: {
        result: {
            price_level: string
        }
    }
}

export interface PlaceId {
    data: {
        candidates: {
            place_id: string
        }[]
    }
}