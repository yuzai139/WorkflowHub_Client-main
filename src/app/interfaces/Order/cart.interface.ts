// 定義購物車項目介面
export interface CartItem {
  fSOPID: number; //商品ID
  fSopName: string; //商品名稱
  fPrice: number; //商品價格
  fSalePoints: number; //商品積分
  fSopDescription: string; //商品描述
  fPubSopImagePath: string| null; //商品圖片路徑
  quantity: number; //商品數量

}


