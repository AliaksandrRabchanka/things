export class ThingModel {
    constructor(
        public id: number | null = null,
        public title: string = '',
        public description: string = '',
        public volume: number | null = null,
        public type: string = 'thing',
        public selected: boolean = false,
        public isHidden: boolean = false,
        public parent: number | null = null,
        public availableVolume?: number| null,
        public canUseToHide?: boolean,
        public hiddenThings?: { containers: number[], things: number[] } | null
    ){}
}