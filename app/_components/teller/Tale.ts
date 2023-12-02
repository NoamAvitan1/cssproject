import EventEmitter from "events"

export const talesManager = new EventEmitter()

export type TalePosition  = 't' | 'tl' | 'tr' | 'b' | 'bl' | 'br'

export type TaleType = 'normal' | 'alert' | 'success' | 'error'

class TaleConfig {
    constructor() {
        this.type = 'normal'
        this.lifeSpan = 3000
        this.animationDuration = 1000
        this.position = 't'
    }

    setType(type: TaleType = this.type) {
        this.type = type
    }

    setPosition(position: TalePosition = this.position) {
        this.position = position
    }

    setLifeSpan(lifeSpan: number = this.lifeSpan) {
        this.lifeSpan = lifeSpan
    }

    setAnimationDuration(animationDuration: number = this.animationDuration) {
        this.animationDuration = animationDuration
    }
    
    type: TaleType
    lifeSpan: number
    animationDuration: number
    position: TalePosition
}

export const tellerConfig = new TaleConfig()

export class Tale {
    constructor(text: string, type: TaleType = tellerConfig.type, lifeSpan: number = tellerConfig.lifeSpan) {
        this.id = Date.now()
        this.text = text
        this.type = type
        this.lifeSpan = lifeSpan
        this.hasAppeared = false
        this.isVanishing = false
    }
    id: number
    text: string
    type: TaleType
    lifeSpan: number
    hasAppeared: boolean
    isVanishing: boolean
}

export const tell = (text: string, type: TaleType = 'normal', lifeSpan: number = 3) => {
    const tale  = new Tale(text, type, lifeSpan)
    talesManager.emit('tell', tale)
}