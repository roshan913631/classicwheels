import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import InquiryTypes "../types/inquiries";
import InquiryLib "../lib/inquiries";

mixin (
  accessControlState : AccessControl.AccessControlState,
  inquiries : List.List<InquiryTypes.Inquiry>,
  nextInquiryId : { var value : Nat },
) {
  public shared func submitInquiry(
    carId : Text,
    buyerName : Text,
    buyerEmail : Text,
    buyerPhone : Text,
    message : Text,
  ) : async Text {
    nextInquiryId.value += 1;
    InquiryLib.submitInquiry(inquiries, nextInquiryId.value, carId, buyerName, buyerEmail, buyerPhone, message);
  };

  public query ({ caller }) func getInquiries() : async [InquiryTypes.Inquiry] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view inquiries");
    };
    InquiryLib.getInquiries(inquiries);
  };

  public shared ({ caller }) func updateInquiryStatus(id : Text, status : Text) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update inquiry status");
    };
    InquiryLib.updateInquiryStatus(inquiries, id, status);
  };

  public shared ({ caller }) func deleteInquiry(id : Text) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete inquiries");
    };
    InquiryLib.deleteInquiry(inquiries, id);
  };
};
