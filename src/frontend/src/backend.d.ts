import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Car {
    id: string;
    model: string;
    mileage: bigint;
    imageUrls: Array<string>;
    make: string;
    year: bigint;
    description: string;
    price: bigint;
}
export interface Inquiry {
    id: string;
    status: string;
    buyerEmail: string;
    carId: string;
    createdAt: bigint;
    buyerPhone: string;
    message: string;
    buyerName: string;
}
export interface CarInput {
    model: string;
    mileage: bigint;
    imageUrls: Array<string>;
    make: string;
    year: bigint;
    description: string;
    price: bigint;
}
export interface Order {
    buyerEmail: string;
    orderStatus: string;
    carId: string;
    createdAt: bigint;
    buyerPhone: string;
    orderId: string;
    updatedAt: bigint;
    buyerName: string;
    paymentAmount: bigint;
}
export interface OrderInput {
    buyerEmail: string;
    carId: string;
    buyerPhone: string;
    buyerName: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addCar(car: CarInput): Promise<Car>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteCar(id: string): Promise<boolean>;
    deleteInquiry(id: string): Promise<boolean>;
    deleteOrder(orderId: string): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getCallerUserRole(): Promise<UserRole>;
    getCar(id: string): Promise<Car | null>;
    getCars(): Promise<Array<Car>>;
    getInquiries(): Promise<Array<Inquiry>>;
    getOrderById(orderId: string): Promise<Order | null>;
    getOrders(): Promise<Array<Order>>;
    isCallerAdmin(): Promise<boolean>;
    submitInquiry(carId: string, buyerName: string, buyerEmail: string, buyerPhone: string, message: string): Promise<string>;
    submitOrder(input: OrderInput): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateCar(id: string, car: CarInput): Promise<boolean>;
    updateInquiryStatus(id: string, status: string): Promise<boolean>;
    updateOrderStatus(orderId: string, status: string): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
}
