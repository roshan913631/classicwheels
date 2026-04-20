import List "mo:core/List";
import Nat "mo:core/Nat";
import CarTypes "../types/cars";

module {
  public type Car = CarTypes.Car;

  public func seedCars(cars : List.List<Car>) {
    if (cars.size() > 0) { return };
    cars.add({
      id = "1";
      make = "Chevrolet";
      model = "Corvette Stingray";
      year = 1963;
      price = 52000;
      mileage = 45000;
      description = "The iconic 1963 Corvette Stingray split-window coupe — a pinnacle of American sports car design with its distinctive split rear window and hidden headlights.";
      imageUrls = ["/placeholder-car-1.jpg"];
    });
    cars.add({
      id = "2";
      make = "Ford";
      model = "Mustang Fastback";
      year = 1967;
      price = 38500;
      mileage = 62000;
      description = "A classic pony car with aggressive fastback styling. This 1967 Mustang features the iconic long-hood, short-deck proportions that defined a generation.";
      imageUrls = ["/placeholder-car-2.jpg"];
    });
    cars.add({
      id = "3";
      make = "Dodge";
      model = "Challenger R/T";
      year = 1970;
      price = 61000;
      mileage = 28000;
      description = "The mighty 1970 Dodge Challenger R/T — a true muscle car legend with its bold lines, wide stance, and legendary HEMI powertrain.";
      imageUrls = ["/placeholder-car-3.jpg"];
    });
    cars.add({
      id = "4";
      make = "Chevrolet";
      model = "Bel Air";
      year = 1957;
      price = 34000;
      mileage = 78000;
      description = "The beloved 1957 Chevy Bel Air, an enduring symbol of 1950s American prosperity. Stunning two-tone paint, fins, and chrome make this a show-stopper.";
      imageUrls = ["/placeholder-car-4.jpg"];
    });
    cars.add({
      id = "5";
      make = "Jaguar";
      model = "E-Type";
      year = 1961;
      price = 95000;
      mileage = 22000;
      description = "Enzo Ferrari called it the most beautiful car ever made. This 1961 Jaguar E-Type Series 1 roadster combines breathtaking design with exhilarating performance.";
      imageUrls = ["/placeholder-car-5.jpg"];
    });
    cars.add({
      id = "6";
      make = "DeLorean";
      model = "DMC-12";
      year = 1984;
      price = 42000;
      mileage = 55000;
      description = "The iconic stainless steel DeLorean DMC-12 with gull-wing doors. A unique piece of automotive history made famous by Back to the Future.";
      imageUrls = ["/placeholder-car-6.jpg"];
    });
    cars.add({
      id = "7";
      make = "Pontiac";
      model = "GTO";
      year = 1969;
      price = 45000;
      mileage = 35000;
      description = "The 1969 Pontiac GTO — the original muscle car. Sleek lines, a powerful V8, and unmistakable presence make this a true classic collector's dream.";
      imageUrls = ["/placeholder-car-7.jpg"];
    });
    cars.add({
      id = "8";
      make = "Ford";
      model = "Shelby GT350";
      year = 1965;
      price = 88000;
      mileage = 18000;
      description = "Carroll Shelby's masterpiece — the 1965 Ford Shelby GT350. Race-bred with a high-revving 289 V8, this is one of the most sought-after Mustang variants ever built.";
      imageUrls = ["/placeholder-car-8.jpg"];
    });
  };

  public func getCars(cars : List.List<Car>) : [Car] {
    cars.toArray();
  };

  public func getCar(cars : List.List<Car>, id : Text) : ?Car {
    cars.find(func(c) { c.id == id });
  };

  public func addCar(cars : List.List<Car>, nextId : Nat, car : CarTypes.CarInput) : Car {
    let newCar : Car = {
      id = nextId.toText();
      make = car.make;
      model = car.model;
      year = car.year;
      price = car.price;
      mileage = car.mileage;
      description = car.description;
      imageUrls = car.imageUrls;
    };
    cars.add(newCar);
    newCar;
  };

  public func updateCar(cars : List.List<Car>, id : Text, car : CarTypes.CarInput) : Bool {
    let idx = cars.findIndex(func(c) { c.id == id });
    switch (idx) {
      case null { false };
      case (?i) {
        cars.put(i, { id; make = car.make; model = car.model; year = car.year; price = car.price; mileage = car.mileage; description = car.description; imageUrls = car.imageUrls });
        true;
      };
    };
  };

  public func deleteCar(cars : List.List<Car>, id : Text) : Bool {
    let sizeBefore = cars.size();
    let filtered = cars.filter(func(c) { c.id != id });
    cars.clear();
    cars.append(filtered);
    cars.size() < sizeBefore;
  };
};
