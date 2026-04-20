module {
  public type Order = {
    orderId : Text;
    carId : Text;
    buyerName : Text;
    buyerEmail : Text;
    buyerPhone : Text;
    paymentAmount : Nat;
    orderStatus : Text; // pending | confirmed | shipped | delivered
    createdAt : Int;
    updatedAt : Int;
  };

  public type OrderInput = {
    carId : Text;
    buyerName : Text;
    buyerEmail : Text;
    buyerPhone : Text;
  };
};
