import List "mo:core/List";
import Time "mo:core/Time";
import OrderTypes "../types/orders";

module {
  public func submitOrder(
    orders : List.List<OrderTypes.Order>,
    orderId : Text,
    input : OrderTypes.OrderInput,
    paymentAmount : Nat,
    now : Int,
  ) : Text {
    let newOrder : OrderTypes.Order = {
      orderId;
      carId = input.carId;
      buyerName = input.buyerName;
      buyerEmail = input.buyerEmail;
      buyerPhone = input.buyerPhone;
      paymentAmount;
      orderStatus = "confirmed"; // dummy payment: auto-confirm
      createdAt = now;
      updatedAt = now;
    };
    orders.add(newOrder);
    orderId;
  };

  public func getOrders(orders : List.List<OrderTypes.Order>) : [OrderTypes.Order] {
    orders.toArray();
  };

  public func getOrderById(orders : List.List<OrderTypes.Order>, orderId : Text) : ?OrderTypes.Order {
    orders.find(func(o) { o.orderId == orderId });
  };

  public func updateOrderStatus(
    orders : List.List<OrderTypes.Order>,
    orderId : Text,
    status : Text,
  ) : Bool {
    let validStatuses = ["pending", "confirmed", "shipped", "delivered"];
    let isValid = validStatuses.find(func(s) { s == status }) != null;
    if (not isValid) { return false };

    let idx = orders.findIndex(func(o) { o.orderId == orderId });
    switch (idx) {
      case null { false };
      case (?i) {
        let existing = orders.at(i);
        orders.put(i, { existing with orderStatus = status; updatedAt = Time.now() });
        true;
      };
    };
  };

  public func deleteOrder(orders : List.List<OrderTypes.Order>, orderId : Text) : Bool {
    let sizeBefore = orders.size();
    let filtered = orders.filter(func(o) { o.orderId != orderId });
    orders.clear();
    orders.append(filtered);
    orders.size() < sizeBefore;
  };
};
