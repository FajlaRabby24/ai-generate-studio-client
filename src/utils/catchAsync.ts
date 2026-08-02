export const catchAsync = async (fn: Function) => {
  try {
    const result = await fn();
    return result;
  } catch (error: any) {
    console.log("from catchAsync", error?.response?.data);
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "An error occurred. Please try again.",
    };
  }
};
