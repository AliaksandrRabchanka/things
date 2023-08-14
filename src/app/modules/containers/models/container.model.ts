export class ContainerModel {
    constructor(
        public id: number | null = null,
        public title: string = '',
        public description: string = '',
        public volume: number | null = null,
        public type: string = 'container',
        public selected: boolean = false,
        public isHidden: boolean = false,
        public parent: number | null = null,
        public availableVolume: number| null = null,
        public canUseToHide: boolean = false,
        public hiddenThings: { containers: number[], things: number[] } | null = null
    ){}
}