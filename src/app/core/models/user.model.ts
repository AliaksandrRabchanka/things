export class UserModel {
    constructor(
        public id: number | null = null,
        public name: string | null = null,
        public email: string | null = null,
        public password: string | null = null
    ){}
}