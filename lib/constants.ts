export const QR_TIMEOUT_SECONDS = Number(
  process.env.NEXT_PUBLIC_QR_TIMEOUT_SECONDS || "120"
);
export const TRANSACTION_CHECK_INTERVAL = Number(
  process.env.NEXT_PUBLIC_TRANSACTION_CHECK_INTERVAL || "5000"
); // 5 seconds
