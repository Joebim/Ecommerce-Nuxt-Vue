interface Rating {
    rate: number;
    count: number;
}

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
}

export interface CartItem {
    id: number;
    image: string;
    name: string;
    price: number;
    quantity: number;
  }

export interface Cart {
    id: number;
    image: string;
    name: string;
    price: number;
  }