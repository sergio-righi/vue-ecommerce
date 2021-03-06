
enum EnumAddress {
  residential = 1,
  business = 2,
}

enum EnumBook {
  physical = 1,
  digital = 2,
  audio = 3
}

enum EnumCountry {
  canada = 1,
  brazil = 2
}

enum EnumCurrency {
  CAD = 1,
  BRL = 4,
}

enum EnumDiscount {
  fixed = 1,
  percentage = 2
}

enum EnumDocument {
  id = 1,
  passport = 2,
  driversLicense = 3
}

enum EnumGender {
  male = 1,
  female = 2,
  omit = 3,
  other = 4
}

enum EnumGenre {
  adventure = 1,
  art = 2,
  children = 3,
  contemporary = 4,
  cooking = 5,
  development = 6,
  dystopian = 7,
  familyRelationship = 8,
  fantasy = 9,
  guide = 10,
  health = 11,
  historicalFiction = 12,
  history = 13,
  horror = 14,
  humor = 15,
  memoir = 16,
  motivational = 17,
  mystery = 18,
  paranormal = 19,
  romance = 20,
  scienceFiction = 21,
  selfHelp = 22,
  thriller = 23,
  travel = 24
}

enum EnumPayment {
  card = 1
}

enum EnumPhone {
  mobile = 1,
  landline = 2,
  business = 3
}

enum EnumRated {
  early = 1,
  middle = 2,
  teen = 3,
  adult = 4
}

enum EnumRole {
  dev = 1,
  adm = 2,
  pub = 3
}

enum EnumStatus {
  pending = 1,
  awaitingPayment = 2,
  awaitingFulfillment = 3,
  awaitingShipment = 4,
  awaitingPickup = 5,
  completed = 6,
  shipped = 7,
  cancelled = 8,
  declined = 9,
  refunded = 10,
  disputed = 11
}

export {
  EnumAddress,
  EnumBook,
  EnumCountry,
  EnumCurrency,
  EnumDiscount,
  EnumDocument,
  EnumGender,
  EnumGenre,
  EnumPayment,
  EnumPhone,
  EnumRated,
  EnumRole,
  EnumStatus
}