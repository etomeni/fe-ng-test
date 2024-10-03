// export interface Address {
//     street: string;
//     city: string;
//     state: string;
//     zipCode: string;
// }
  
// export interface Contact {
//     id?: string;
//     name: string;
//     phoneNumber: string;
//     email: string;
//     addresses: Address[];
//     longitude: number;
//     latitude: number;
// }


export interface Contact {
    id?: string;
    name: string;
    phoneNumber: string;
    email: string;
    randomAddress?: string;
    addresses: { address: string }[];
    longitude: number;
    latitude: number;
  }