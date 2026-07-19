export const catchAsync = async (fn: Function) => {
  try {
    const result = await fn();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error?.message || "An error occurred. Please try again.",
    };
  }
};
