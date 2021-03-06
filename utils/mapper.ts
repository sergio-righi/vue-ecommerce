import * as enumerable from "./enums"

const addresses: any = {
    [enumerable.EnumAddress.residential]: "enum.address.residential",
    [enumerable.EnumAddress.business]: "enum.address.business"
}

const books: any = {
    [enumerable.EnumBook.physical]: "enum.book.physical",
    [enumerable.EnumBook.digital]: "enum.book.digital",
    [enumerable.EnumBook.audio]: "enum.book.audio"
}

const countries: any = {
    [enumerable.EnumCountry.canada]: "enum.country.canada",
    [enumerable.EnumCountry.brazil]: "enum.country.brazil",
}

const discounts: any = {
    [enumerable.EnumDiscount.fixed]: "enum.discount.fixed",
    [enumerable.EnumDiscount.percentage]: "enum.discount.percentage"
}

const documents = {
    [enumerable.EnumDocument.id]: "enum.document.id",
    [enumerable.EnumDocument.passport]: "enum.document.passport",
    [enumerable.EnumDocument.driversLicense]: "enum.document.drivers_license",
};

const genders = {
    [enumerable.EnumGender.male]: "enum.gender.male",
    [enumerable.EnumGender.female]: "enum.gender.female",
    [enumerable.EnumGender.omit]: "enum.gender.omit",
    [enumerable.EnumGender.other]: "enum.gender.other"
};

const genres = {
    [enumerable.EnumGenre.adventure]: "enum.genre.adventure",
    [enumerable.EnumGenre.art]: "enum.genre.art",
    [enumerable.EnumGenre.children]: "enum.genre.children",
    [enumerable.EnumGenre.contemporary]: "enum.genre.contemporary",
    [enumerable.EnumGenre.cooking]: "enum.genre.cooking",
    [enumerable.EnumGenre.development]: "enum.genre.development",
    [enumerable.EnumGenre.dystopian]: "enum.genre.dystopian",
    [enumerable.EnumGenre.familyRelationship]: "enum.genre.family_relationship",
    [enumerable.EnumGenre.fantasy]: "enum.genre.fantasy",
    [enumerable.EnumGenre.guide]: "enum.genre.guide",
    [enumerable.EnumGenre.health]: "enum.genre.health",
    [enumerable.EnumGenre.historicalFiction]: "enum.genre.historical_fiction",
    [enumerable.EnumGenre.history]: "enum.genre.history",
    [enumerable.EnumGenre.horror]: "enum.genre.horror",
    [enumerable.EnumGenre.humor]: "enum.genre.humor",
    [enumerable.EnumGenre.memoir]: "enum.genre.memoir",
    [enumerable.EnumGenre.motivational]: "enum.genre.motivational",
    [enumerable.EnumGenre.mystery]: "enum.genre.mystery",
    [enumerable.EnumGenre.paranormal]: "enum.genre.paranormal",
    [enumerable.EnumGenre.romance]: "enum.genre.romance",
    [enumerable.EnumGenre.scienceFiction]: "enum.genre.science_fiction",
    [enumerable.EnumGenre.selfHelp]: "enum.genre.self_help",
    [enumerable.EnumGenre.thriller]: "enum.genre.thriller",
    [enumerable.EnumGenre.travel]: "enum.genre.travel",
};

const payments: any = {
    [enumerable.EnumPayment.card]: "enum.payment.card"
};

const phones: any = {
    [enumerable.EnumPhone.mobile]: "enum.phone.mobile",
    [enumerable.EnumPhone.landline]: "enum.phone.landline",
    [enumerable.EnumPhone.business]: "enum.phone.business"
};

const rates: any = {
    [enumerable.EnumRated.early]: "enum.rated.early",
    [enumerable.EnumRated.middle]: "enum.rated.middle",
    [enumerable.EnumRated.teen]: "enum.rated.teen",
    [enumerable.EnumRated.adult]: "enum.rated.adult"
};

const roles: any = {
    [enumerable.EnumRole.pub]: "enum.role.publisher"
};

const status: any = {
    [enumerable.EnumStatus.pending]: "enum.status.pending",
    [enumerable.EnumStatus.awaitingPayment]: "enum.status.awaiting_payment",
    [enumerable.EnumStatus.awaitingFulfillment]: "enum.status.awaiting_fulfillment",
    [enumerable.EnumStatus.awaitingShipment]: "enum.status.awaiting_shipment",
    [enumerable.EnumStatus.awaitingPickup]: "enum.status.awaiting_pickup",
    [enumerable.EnumStatus.completed]: "enum.status.completed",
    [enumerable.EnumStatus.shipped]: "enum.status.shipped",
    [enumerable.EnumStatus.cancelled]: "enum.status.cancelled",
    [enumerable.EnumStatus.declined]: "enum.status.declined",
    [enumerable.EnumStatus.refunded]: "enum.status.refunded",
    [enumerable.EnumStatus.disputed]: "enum.status.disputed"
}

export const mapper = {
    addresses,
    books,
    countries,
    discounts,
    documents,
    genders,
    genres,
    payments,
    phones,
    rates,
    roles,
    status,
};

export const initializeEnum = {
    mapper: mapper,
    enumerable: enumerable
}
