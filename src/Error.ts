import { ThrowError, ApiError } from './typings/Error.d';

export function throwError(err: ThrowError) {
    throw console.error(err)
}

export function apiError(err: ApiError) {
    console.error(err)
}