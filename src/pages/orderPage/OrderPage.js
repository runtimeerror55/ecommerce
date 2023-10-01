export const orderDataLoader = async ({ params }) => {
      const response = await fetch(
            `http://localhost:3000/account/orders/${params.orderId}`
      );
      const data = await response.json();
      return data;
};
