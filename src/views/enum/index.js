export default {
    userType: {
        ADMIN: 1,
        DATA_ENTRY: 2,
        STOCK_CONTROLL: 3
    },

    stockStatus: {
        IN_STOCK: 1,
        WARNING: 2,
        OUT_OF_STOCK: 3
    },

    invoiceStatus: {
        PENDING: 0,
        SOME_PAY: 1,
        PAID: 2,
        OVER_DUE: 3
    },

    invoiceCodeError: {
        INVOICE_NOT_FOUND: 603,
        INVOICE_HAS_PAID: 604,
        INVOICE_OVER_AMOUNT: 605,
        INVOICE_CREATED: 201
    }
}