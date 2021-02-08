export interface ApiError {
    response: {
        data: {
            error_message: string
        }
    }

}

export interface ThrowError {
    response: any
}


