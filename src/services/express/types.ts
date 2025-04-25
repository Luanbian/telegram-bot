export interface APIEcho {
    server: string;
    version: string;
}

export interface APIResponse<T = unknown, E = any> {
    code: string;
    message: string;
    args?: E;
    data?: T;
}
