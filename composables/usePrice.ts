export const usePrice = (amount: number | undefined) => {
    const USDollar = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    return USDollar.format(amount ?? 0);
};

