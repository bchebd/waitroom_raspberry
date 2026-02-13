export interface User {
    id: string,
    name: string,
    passwd: string,
    admin: boolean
};

export interface Tag {
    id: string,
    userId: number
}