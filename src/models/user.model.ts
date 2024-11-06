export class User {
    id?: number;
    name?: string;

    constructor({id, name}) {
        if (id) this.id = id;
        if (name) this.name = name;
    }
}