function newResponseWrappedInAPromiseWith(data: any): Promise<Response> {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(new Response(JSON.stringify({ data: data }), {
        status: 200,
      }));
    }, 50);
  });
}

export default {
  authentication: {
    login(data: any) {
      return newResponseWrappedInAPromiseWith(data);
    },
    signup(data: any) {
      return newResponseWrappedInAPromiseWith(data);
    },
    canI(data: any) {
      return newResponseWrappedInAPromiseWith(data);
    },
  },
  user: {
    getProfile() {
      return new Promise((res, rej) => {});
    },
    updateProfile() {
      return new Promise((res, rej) => {});
    },
    patchProfile() {
      return new Promise((res, rej) => {});
    },
  },
  shop: {
    createShop() {
      return new Promise((res, rej) => {});
    },
    updateShop() {
      return new Promise((res, rej) => {});
    },
  },
  products: {
    getAllProducts() {
      return new Promise<Response>((res, rej) => {
        setTimeout(() => {
          res(
            new Response(
              JSON.stringify({
                products: Array(10).map((_, i) => {
                  return {
                    id: crypto.randomUUID(),
                    name: `Product ${i + 1}`,
                    price: BigInt(Math.floor(Math.random() * 850)),
                    inventory: BigInt(Math.floor(Math.random() * 100)),
                  };
                }),
              }),
              { status: 200, statusText: 'OK' },
            ),
          );
        }, 10);
      });
    },
    searchProducts() {
      return new Promise((res, rej) => {});
    },
    addProduct() {
      return new Promise((res, rej) => {});
    },
    updateProduct() {
      return new Promise((res, rej) => {});
    },
  },
  sales: {
    newSale() {
      return new Promise((res, rej) => {});
    },
    updateSale() {
      return new Promise((res, rej) => {});
    },
    closeSale() {
      return new Promise((res, rej) => {});
    },
  },
  saleItems: {
    addSaleItem() {
      return new Promise((res, rej) => {});
    },
    updateSaleItem() {
      return new Promise((res, rej) => {});
    },
    removeSaleItem() {
      return new Promise((res, rej) => {});
    },
  },
  salePayments: {
    addSalePayment() {
      return new Promise((res, rej) => {});
    },
    getSalePayments() {
      return new Promise((res, rej) => {});
    },
  },
  creditAccounts: {
    createCreditAccount() {
      return new Promise((res, rej) => {});
    },
    updateCreditAccount() {
      return new Promise((res, rej) => {});
    },
  },
  creditEntries: {
    getAllCredientriesOfAccount() {
      return new Promise((res, rej) => {});
    },
  },
  creditPayment: {
    addPayment() {
      return new Promise((res, rej) => {});
    },
  },
};
