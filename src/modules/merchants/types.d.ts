export interface Bid {
  id: number,
  carTitle: string,
  amount: number,
  createdAt: number
}

export interface Merchant {
  id: number,
  firstname: string,
  lastname: string,
  avatarUrl: string,
  email: string,
  phone: string,
  hasPremium: boolean,
  bids: Array<Bid>
}
