import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import CarsApi "mixins/cars-api";
import InquiriesApi "mixins/inquiries-api";
import OrdersApi "mixins/orders-api";
import CarLib "lib/cars";
import CarTypes "types/cars";
import InquiryTypes "types/inquiries";
import OrderTypes "types/orders";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let cars = List.empty<CarTypes.Car>();
  let inquiries = List.empty<InquiryTypes.Inquiry>();
  let orders = List.empty<OrderTypes.Order>();

  // Auto-increment ID counters (mutable wrapper objects for pass-by-reference semantics)
  let nextCarId = { var value : Nat = 8 };
  let nextInquiryId = { var value : Nat = 0 };
  let nextOrderId = { var value : Nat = 0 };

  // Seed classic cars on first deploy (only if empty)
  CarLib.seedCars(cars);

  include CarsApi(accessControlState, cars, nextCarId);
  include InquiriesApi(accessControlState, inquiries, nextInquiryId);
  include OrdersApi(accessControlState, cars, orders, nextOrderId);
};
