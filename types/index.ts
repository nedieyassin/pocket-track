export interface IUser {
    id: string
    currency: string
}

export interface IWallet {
    id: string
    name: string
    color: string
    icon: string
    balance: number
    createdAt: string
    updatedAt: string
    userId: string
}

export interface ITransaction {
    id: string
    type: number | "INCOME" | "EXPENSE"
    name: string
    amount: number
    isTransfer: boolean
    date: string
    notes: string
    createdAt: string
    updatedAt: string
    userId: string
    walletId: string
    transactionCategoryId: string
    transactionCategory: ITransactionCategory
}

export interface ITransactionCategory {
    id: string
    type: "INCOME" | "EXPENSE"
    name: string,
    createdAt: string,
    updatedAt: string,
    userId?: string
}