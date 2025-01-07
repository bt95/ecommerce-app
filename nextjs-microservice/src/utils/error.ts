export const productNotFoundError = new Error("Product not found");

export const getMethodNotAllowedError = (
  requestedMethod: string | undefined,
  allowedMethods: string[]
): Error => {
  return new Error(
    `Method ${requestedMethod} not allowed. Allowed methods: ${allowedMethods.join(
      ", "
    )}`
  );
};
