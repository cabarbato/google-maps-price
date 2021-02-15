import { APIErrorType } from './typings/Error';

export function APIError(err: APIErrorType) {
    console.error(err)
}