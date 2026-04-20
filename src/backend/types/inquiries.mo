module {
  public type Inquiry = {
    id : Text;
    carId : Text;
    buyerName : Text;
    buyerEmail : Text;
    buyerPhone : Text;
    message : Text;
    status : Text; // "new" | "contacted" | "resolved"
    createdAt : Int;
  };
};
