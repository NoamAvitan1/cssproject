import EventEmitter from "events"

export const talesManager = new EventEmitter()

export type TalePosition  = 't' | 'tl' | 'tr' | 'b' | 'bl' | 'br'

export type TaleType = 'normal' | 'alert' | 'success' | 'error'

class TaleConfig {
    constructor() {
        this.type = 'normal'
        this.duration = 3000
        this.position = 't'
    }

    setType(type: TaleType = this.type) {
        this.type = type
    }

    setPosition(position: TalePosition = this.position) {
        this.position = position
    }

    setDuration(duration: number = this.duration) {
        this.duration = duration
    }
    
    type: TaleType
    duration: number
    position: TalePosition
}

export const tellerConfig = new TaleConfig()

export class Tale {
    constructor(text: string, type: TaleType = tellerConfig.type, duration: number = tellerConfig.duration) {
        this.text = text
        this.type = type
        this.duration = duration
        this.isVanishing = false
    }
    vanish(duration: number, onStart?: Function, onEnd?: Function) {
        if (onStart) onStart()
        setTimeout(() => {
            if (onEnd) onEnd()
        }, duration);
    }

    text: string
    type: TaleType
    duration: number
    isVanishing: boolean
}

export const tell = (text: string, type: TaleType = 'normal', duration: number = 3) => {
    const tale  = new Tale(text, type, duration)
    talesManager.emit('tell', tale)
}