import type { backendInterface, Car, Inquiry, Order, OrderInput } from "../backend";
import { UserRole } from "../backend";

const sampleCars: Car[] = [
  {
    id: "1",
    make: "Chevrolet",
    model: "Corvette Stingray",
    year: BigInt(1963),
    price: BigInt(52000),
    mileage: BigInt(45000),
    description:
      "The iconic 1963 Corvette Stingray split-window coupe — a pinnacle of American sports car design with its distinctive split rear window and hidden headlights.",
    imageUrls: ["/placeholder-car-1.jpg"],
  },
  {
    id: "2",
    make: "Ford",
    model: "Mustang Fastback",
    year: BigInt(1967),
    price: BigInt(38500),
    mileage: BigInt(62000),
    description:
      "A classic pony car with aggressive fastback styling. This 1967 Mustang features the iconic long-hood, short-deck proportions that defined a generation.",
    imageUrls: ["/placeholder-car-2.jpg"],
  },
  {
    id: "3",
    make: "Dodge",
    model: "Challenger R/T",
    year: BigInt(1970),
    price: BigInt(61000),
    mileage: BigInt(28000),
    description:
      "The mighty 1970 Dodge Challenger R/T — a true muscle car legend with its bold lines, wide stance, and legendary HEMI powertrain.",
    imageUrls: ["/placeholder-car-3.jpg"],
  },
  {
    id: "4",
    make: "Chevrolet",
    model: "Bel Air",
    year: BigInt(1957),
    price: BigInt(34000),
    mileage: BigInt(78000),
    description:
      "The beloved 1957 Chevy Bel Air, an enduring symbol of 1950s American prosperity. Stunning two-tone paint, fins, and chrome make this a show-stopper.",
    imageUrls: ["/placeholder-car-4.jpg"],
  },
  {
    id: "5",
    make: "Jaguar",
    model: "E-Type",
    year: BigInt(1961),
    price: BigInt(95000),
    mileage: BigInt(22000),
    description:
      "Enzo Ferrari called it the most beautiful car ever made. This 1961 Jaguar E-Type Series 1 roadster combines breathtaking design with exhilarating performance.",
    imageUrls: ["/placeholder-car-5.jpg"],
  },
  {
    id: "6",
    make: "DeLorean",
    model: "DMC-12",
    year: BigInt(1984),
    price: BigInt(42000),
    mileage: BigInt(55000),
    description:
      "The iconic stainless steel DeLorean DMC-12 with gull-wing doors. A unique piece of automotive history made famous by Back to the Future.",
    imageUrls: ["/placeholder-car-6.jpg"],
  },
];

const sampleInquiries: Inquiry[] = [
  {
    id: "inq-1",
    carId: "1",
    status: "new",
    buyerName: "James Thornton",
    buyerEmail: "james.thornton@example.com",
    buyerPhone: "555-0101",
    message: "I'm very interested in the 1963 Corvette. Is it still available?",
    createdAt: BigInt(1713600000000000000),
  },
  {
    id: "inq-2",
    carId: "2",
    status: "contacted",
    buyerName: "Margaret Sullivan",
    buyerEmail: "margaret.s@example.com",
    buyerPhone: "555-0202",
    message: "Can we schedule a test drive for the Mustang Fastback?",
    createdAt: BigInt(1713500000000000000),
  },
  {
    id: "inq-3",
    carId: "5",
    status: "resolved",
    buyerName: "Robert Clements",
    buyerEmail: "r.clements@example.com",
    buyerPhone: "555-0303",
    message: "What is the service history on the Jaguar E-Type?",
    createdAt: BigInt(1713400000000000000),
  },
];

let sampleOrders: Order[] = [
  {
    orderId: "ORD-1",
    carId: "1",
    buyerName: "Alice Monroe",
    buyerEmail: "alice.monroe@example.com",
    buyerPhone: "555-1111",
    paymentAmount: BigInt(52000),
    orderStatus: "confirmed",
    createdAt: BigInt(1713700000000000000),
    updatedAt: BigInt(1713700000000000000),
  },
  {
    orderId: "ORD-2",
    carId: "3",
    buyerName: "George Harrington",
    buyerEmail: "george.h@example.com",
    buyerPhone: "555-2222",
    paymentAmount: BigInt(61000),
    orderStatus: "pending",
    createdAt: BigInt(1713650000000000000),
    updatedAt: BigInt(1713650000000000000),
  },
];

let nextOrderIdCounter = 3;

export const mockBackend: backendInterface = {
  getCars: async () => sampleCars,
  getCar: async (id: string) => sampleCars.find((c) => c.id === id) ?? null,
  addCar: async (car) => ({
    id: "99",
    ...car,
  }),
  updateCar: async () => true,
  deleteCar: async () => true,
  getInquiries: async () => sampleInquiries,
  submitInquiry: async () => "inq-new",
  updateInquiryStatus: async () => true,
  deleteInquiry: async () => true,
  getCallerUserRole: async () => UserRole.admin,
  isCallerAdmin: async () => true,
  assignCallerUserRole: async () => undefined,
  _initializeAccessControl: async () => {},
  submitOrder: async (input: OrderInput) => {
    const car = sampleCars.find((c) => c.id === input.carId);
    if (!car) return { __kind__: "err", err: "Car not found" };
    const orderId = `ORD-${nextOrderIdCounter++}`;
    const now = BigInt(Date.now()) * BigInt(1_000_000);
    sampleOrders.push({
      orderId,
      carId: input.carId,
      buyerName: input.buyerName,
      buyerEmail: input.buyerEmail,
      buyerPhone: input.buyerPhone,
      paymentAmount: car.price,
      orderStatus: "confirmed",
      createdAt: now,
      updatedAt: now,
    });
    return { __kind__: "ok", ok: orderId };
  },
  getOrders: async () => sampleOrders,
  getOrderById: async (orderId: string) =>
    sampleOrders.find((o) => o.orderId === orderId) ?? null,
  updateOrderStatus: async (orderId: string, status: string) => {
    const order = sampleOrders.find((o) => o.orderId === orderId);
    if (!order) return { __kind__: "err", err: "Order not found" };
    order.orderStatus = status;
    order.updatedAt = BigInt(Date.now()) * BigInt(1_000_000);
    return { __kind__: "ok", ok: true };
  },
  deleteOrder: async (orderId: string) => {
    const before = sampleOrders.length;
    sampleOrders = sampleOrders.filter((o) => o.orderId !== orderId);
    return { __kind__: "ok", ok: sampleOrders.length < before };
  },
};
