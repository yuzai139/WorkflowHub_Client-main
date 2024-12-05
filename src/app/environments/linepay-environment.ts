export const environment = {
  production: false,
  // 您的後端 API URL（用於處理 LINE Pay 回調）
  apiUrl: 'https://localhost:7146', // 例如 http://localhost:8080

  linePay: {
    channelId: '2006569835',
    channelSecret: '296a0f6fdb8fbae0479d8a8171acc9a0',
    // LINE Pay API 相關端點
    apiUrl: 'https://sandbox-api-pay.line.me',
    // 支付請求端點
    paymentRequestUrl: 'https://sandbox-api-pay.line.me/v3/payments/request',
    // 支付確認端點
    paymentConfirmUrl: 'https://sandbox-api-pay.line.me/v3/payments/confirm',
    // 支付取消端點
    paymentCancelUrl: 'https://sandbox-api-pay.line.me/v3/payments/cancel',
    // 回調 URLs（需要改為您的實際網址）
    confirmUrl: 'http://localhost:4200/order/confirm', // 支付成功後的回調頁面
    cancelUrl: 'http://localhost:4200/order/cancel'    // 支付取消後的回調頁面
  }
};
