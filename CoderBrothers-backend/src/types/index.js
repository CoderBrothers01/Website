export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}

export interface RequestPayload {
    userId: string;
    data: any;
}