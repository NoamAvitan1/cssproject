import { BaseSyntheticEvent } from "react";

export const pStopper = (e, cb) => {
    e.stopPropagation()
    cb()
}