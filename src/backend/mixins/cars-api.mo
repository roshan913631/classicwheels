import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CarTypes "../types/cars";
import CarLib "../lib/cars";

mixin (
  accessControlState : AccessControl.AccessControlState,
  cars : List.List<CarTypes.Car>,
  nextCarId : { var value : Nat },
) {
  public query func getCars() : async [CarTypes.Car] {
    CarLib.getCars(cars);
  };

  public query func getCar(id : Text) : async ?CarTypes.Car {
    CarLib.getCar(cars, id);
  };

  public shared ({ caller }) func addCar(car : CarTypes.CarInput) : async CarTypes.Car {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add cars");
    };
    nextCarId.value += 1;
    CarLib.addCar(cars, nextCarId.value, car);
  };

  public shared ({ caller }) func updateCar(id : Text, car : CarTypes.CarInput) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update cars");
    };
    CarLib.updateCar(cars, id, car);
  };

  public shared ({ caller }) func deleteCar(id : Text) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete cars");
    };
    CarLib.deleteCar(cars, id);
  };
};
