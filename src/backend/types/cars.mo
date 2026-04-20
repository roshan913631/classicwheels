module {
  public type Car = {
    id : Text;
    make : Text;
    model : Text;
    year : Nat;
    price : Nat;
    mileage : Nat;
    description : Text;
    imageUrls : [Text];
  };

  public type CarInput = {
    make : Text;
    model : Text;
    year : Nat;
    price : Nat;
    mileage : Nat;
    description : Text;
    imageUrls : [Text];
  };
};
