export const ContactInfoInitialForm = {
  name: "",
  phone: "",
  email: "",
  address1: "",
  address2: "",
  city: "",
  zipcode: "",
};

//The following might not include all the fields in a request object returned
//by Firebase
export const InitialRequestPost = {
  buyerId: null,
  buyerDate: null,
  store: null,
  typeErrand: null,
  shoppingList: [{ item: null, quantity: null, replace: false, notShow: false }],
  priority: false,
  note: null,
  price: null,
  buyerName: null,
  buyerPhone: null,
  address1: null,
  address2: null,
  city: null,
  zipcode: null,
  otherstore : null,
};

export const InitialOfferDelivery = {
  driverDate: null,
  driverName: null,
  driverPhone: null,
};
