import { Injectable } from '@angular/core';
import { CartItem } from '../../interfaces/Order/cart.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_KEY = 'cartItems'; //購物車key

  constructor() { }

  //看到就不爽，連欄位都要自訂是什麼意思，我們用不同資料庫嗎
  //看似是將多筆購物車存成一個陣列?
  getCartItems(): CartItem[] {
    const items = localStorage.getItem(this.CART_KEY); //獲取購物車資料
    return items ? JSON.parse(items) : []; //如果購物車資料不是空的，就將購物車資料轉換為陣列
  }

  //接收workFlowProd來的購物車資料，maybe欄位名字改一樣就接的到了
  addToCart(cartItem: CartItem): void {
    const cartItems = this.getCartItems();
    const existingItem = cartItems.find(i => i.fSOPID === cartItem.fSOPID);

    if (existingItem) { //如果購物車資料已經存在
      existingItem.fPrice = Number(cartItem.fPrice); //更新商品價格
    } else {
      cartItem.quantity = 1; //商品數量1
      cartItem.fPrice = Number(cartItem.fPrice); //更新商品價格
      cartItems.push(cartItem); //將商品資料推入購物車
    }

    localStorage.setItem(this.CART_KEY, JSON.stringify(cartItems)); //將購物車資料存入localStorage
    console.log('購物車更新後的內容:', this.getCartItems()); //印出購物車資料
  }
//更新商品數量
  updateQuantity(productId: number, quantity: number): void {
    const cartItems = this.getCartItems(); //獲取購物車資料
    const item = cartItems.find(i => i.fSOPID === productId); //找到購物車資料的商品
    if (item) { //如果購物車資料的商品存在
      item.quantity = quantity; //更新商品數量
      localStorage.setItem(this.CART_KEY, JSON.stringify(cartItems)); //將購物車資料存入localStorage
    }
  }
//獲取購物車資料
  removeItem(productId: number): void {
    let cartItems = this.getCartItems(); //獲取購物車資料
    cartItems = cartItems.filter(item => item.fSOPID !== productId); //過濾掉購物車資料的商品
    localStorage.setItem(this.CART_KEY, JSON.stringify(cartItems)); //將購物車資料存入localStorage
  }
//移除購物車資料
  clearCart(): void {
    localStorage.removeItem(this.CART_KEY); //移除購物車資料
  }
}
