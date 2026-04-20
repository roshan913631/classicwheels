import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import CarTypes "../types/cars";
import CarLib "../lib/cars";
import OrderTypes "../types/orders";
import OrderLib "../lib/orders";

mixin (
  accessControlState : AccessControl.AccessControlState,
  cars : List.List<CarTypes.Car>,
  orders : List.List<OrderTypes.Order>,
  nextOrderId : { var value : Nat },
) {
  public shared func submitOrder(input : OrderTypes.OrderInput) : async { #ok : Text; #err : Text } {
    // Validate car exists and fetch price
    switch (CarLib.getCar(cars, input.carId)) {
      case null { #err("Car not found") };
      case (?car) {
        nextOrderId.value += 1;
        let orderId = "ORD-" # nextOrderId.value.toText();
        let now = Time.now();
        let id = OrderLib.submitOrder(orders, orderId, input, car.price, now);
        #ok(id);
      };
    };
  };

  public query ({ caller }) func getOrders() : async [OrderTypes.Order] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view orders");
    };
    OrderLib.getOrders(orders);
  };

  public query func getOrderById(orderId : Text) : async ?OrderTypes.Order {
    OrderLib.getOrderById(orders, orderId);
  };

  public shared ({ caller }) func updateOrderStatus(orderId : Text, status : Text) : async { #ok : Bool; #err : Text } {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    let valid = ["pending", "confirmed", "shipped", "delivered"];
    if (valid.find(func(s) { s == status }) == null) {
      return #err("Invalid status. Must be one of: pending, confirmed, shipped, delivered");
    };
    #ok(OrderLib.updateOrderStatus(orders, orderId, status));
  };

  public shared ({ caller }) func deleteOrder(orderId : Text) : async { #ok : Bool; #err : Text } {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete orders");
    };
    #ok(OrderLib.deleteOrder(orders, orderId));
  };
};
