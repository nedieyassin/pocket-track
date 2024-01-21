export const formatNumber = (number: number | string, fix = 2) => {
    return parseFloat(number.toString()).toFixed(fix).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const getYearMonths = (year: number) => {
    const months = []
    const monthsText: any[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    for (let i = 0; i < 12; i++) {
        months.push({
            label: monthsText[i] + ' ' + year,
            value: year + '-' + (i + 1),
            index: i,
            year
        })
    }
    return months
}


export const currencyOptions: { name: string; value: string }[] = [
    {name: 'US Dollar ($)', value: '$'},
    {name: 'Euro (€)', value: '€'},
    {name: 'British Pound (£)', value: '£'},
    {name: 'Japanese Yen (¥)', value: '¥'},
    {name: 'Swiss Franc (CHF)', value: 'CHF'},
    {name: 'Canadian Dollar (CA$)', value: 'CA$'},
    {name: 'Australian Dollar (A$)', value: 'A$'},
    {name: 'New Zealand Dollar (NZ$)', value: 'NZ$'},
    {name: 'Chinese Yuan (¥)', value: '¥'},
    {name: 'Indian Rupee (₹)', value: '₹'},
    {name: 'Brazilian Real (R$)', value: 'R$'},
    {name: 'South African Rand (R)', value: 'R'},
    {name: 'Malawian Kwacha (MWK)', value: 'MWK'},
    {name: 'Mexican Peso (MXN$)', value: 'MXN$'},
    {name: 'Singapore Dollar (S$)', value: 'S$'},
    {name: 'Hong Kong Dollar (HK$)', value: 'HK$'},
    {name: 'Swedish Krona (SEK)', value: 'SEK'},
    {name: 'Norwegian Krone (NOK)', value: 'NOK'},
    {name: 'Danish Krone (DKK)', value: 'DKK'},
    {name: 'Russian Ruble (₽)', value: '₽'},
    {name: 'Turkish Lira (₺)', value: '₺'},
];