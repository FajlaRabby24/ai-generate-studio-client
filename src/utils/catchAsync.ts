export const catchAsync = async (fn: Function) => {
  try {
    const result = await fn();
    return result;
  } catch (error: any) {
    // // console.log("from catchAsync", error?.response?.data || error?.message);

    return {
      success: false,
      message:
        error?.response?.data?.message || // axios/HTTP error হলে
        error?.message || // plain Error (যেমন validation error) হলে
        "An error occurred. Please try again.",
    };
  }
};
