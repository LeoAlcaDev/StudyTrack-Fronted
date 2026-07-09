export interface RegisterRequest {
    username: string;
    email: string; 
    password: string;
    fullName: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;
}

export type CourseStatus = "EN_CURSO" | "APROBADO" | "DESAPROBADO";

export interface Courses {
    id: number;
    name: string;
    code: string;
    credits: number;
    grade: number;
    status: CourseStatus;
}

export interface CreateCourseRequest {
    name: string;
    code: string;
    credits: number;
    grade: number;
    status: CourseStatus;
}

export interface Page<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}

