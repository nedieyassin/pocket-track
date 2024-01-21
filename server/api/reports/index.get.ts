export default defineEventHandler(async (event) => {
    const {userId, isAuthenticated} = await getAuthenticatedUser(event);
    const {date_start, date_end} = getQuery(event);
    const start = new Date(date_start + ' 00:00:00');
    const end = new Date(date_end + ' 23:59:59');

    if (isAuthenticated) {

        const cashflow = await prisma.$queryRaw<Record<string, any>[]>`
            SELECT SUM(amount) as total,
                   "Transaction".type
            FROM "Transaction"
            WHERE "Transaction"."userId" = ${userId}
              AND "Transaction"."date" >= ${start}::DATE
              AND "Transaction"."date" <= ${end}::DATE
            GROUP BY "Transaction".type;
        `;

        const groupedCashflow = cashflow.reduce((prev, curr) => {
            if (prev[curr.type]) {
                prev[curr.type] = curr;
            } else {
                prev[curr.type] = curr;
            }
            return prev;
        }, {});


        const result = await prisma.$queryRaw<Record<string, any>[]>`
            SELECT SUM(amount) as total,
                   "Transaction".type,
                   "TransactionCategory"."name"
            FROM "Transaction"
                     LEFT JOIN "TransactionCategory"
                               ON "Transaction"."transactionCategoryId" = "TransactionCategory"."id"
            WHERE "Transaction"."userId" = ${userId}
              AND "Transaction"."date" >= ${start}::DATE
              AND "Transaction"."date" <= ${end}::DATE
            GROUP BY "Transaction".type, "TransactionCategory"."name";
        `;

        const groupedResult = result.reduce((prev, curr) => {
            if (prev[curr.type]) {
                prev[curr.type].push(curr);
            } else {
                prev[curr.type] = [curr];
            }
            return prev;
        }, {})


        return {groupedCashflow, groupedResult};

    } else {
        throw createError({statusCode: 401, statusMessage: 'Unauthorized'})
    }
})