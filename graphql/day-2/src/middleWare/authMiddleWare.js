const authMiddleWare = (inputs, context, next) => {
  if (!context.user) {
    throw new Error("UNAUTHENTICATED");
  }
  console.log(inputs);

  return next(inputs, context.user.id);
};

export default authMiddleWare;
