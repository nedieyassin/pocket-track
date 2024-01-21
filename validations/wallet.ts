import {object, string, date, number} from 'yup'

export const walletSchema = object({
    icon: string().required().label('Icon'),
    color: string().required().label('Background'),
    name: string().required().label('Name'),
})

export const transactionSchema = object({
    name: string().required().label('Name'),
    type: string().required().label('Type'),
    transactionCategoryId: string().required().label('Category'),
    date: date().required().label('Date'),
    amount: number().positive().required().label('Amount'),
})