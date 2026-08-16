export type User = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
};

export type LoginInput = {
    email: string;
    password: string;
};

export type RegisterInput = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export type AuthResponse = {
    message: string;
    user: User;
};