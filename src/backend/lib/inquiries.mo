import List "mo:core/List";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import InquiryTypes "../types/inquiries";

module {
  public type Inquiry = InquiryTypes.Inquiry;

  public func submitInquiry(
    inquiries : List.List<Inquiry>,
    nextId : Nat,
    carId : Text,
    buyerName : Text,
    buyerEmail : Text,
    buyerPhone : Text,
    message : Text,
  ) : Text {
    let id = nextId.toText();
    let inquiry : Inquiry = {
      id;
      carId;
      buyerName;
      buyerEmail;
      buyerPhone;
      message;
      status = "new";
      createdAt = Time.now();
    };
    inquiries.add(inquiry);
    id;
  };

  public func getInquiries(inquiries : List.List<Inquiry>) : [Inquiry] {
    inquiries.toArray();
  };

  public func updateInquiryStatus(
    inquiries : List.List<Inquiry>,
    id : Text,
    status : Text,
  ) : Bool {
    let idx = inquiries.findIndex(func(i) { i.id == id });
    switch (idx) {
      case null { false };
      case (?i) {
        let existing = inquiries.at(i);
        inquiries.put(i, { existing with status });
        true;
      };
    };
  };

  public func deleteInquiry(inquiries : List.List<Inquiry>, id : Text) : Bool {
    let sizeBefore = inquiries.size();
    let filtered = inquiries.filter(func(i) { i.id != id });
    inquiries.clear();
    inquiries.append(filtered);
    inquiries.size() < sizeBefore;
  };
};
