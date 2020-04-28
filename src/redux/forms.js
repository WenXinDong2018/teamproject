export const ContactInfoInitialForm = {
    name: '',
    phone: '',
    email: '',
    address1: '',
    address2: '',
    city:'',
    zipcode:'',
};

export const InitialRequestPost = {
    buyerId:null,
    buyerDate: null,
    store: null,
    typeErrand: null,
    shoppingList: [{item:null, quantity: null, replace: false}],
    priority: false,
    venmo: false,
    cash: false,
    note: null,
    price: null,
    buyerName: null,
    buyerPhone: null,
    address1: null,
    address2: null,
    city:null,
    zipcode:null,
};

export const InitialOfferDelivery= {
    driverDate: null,
    driverName: null,
    driverPhone: null,
};