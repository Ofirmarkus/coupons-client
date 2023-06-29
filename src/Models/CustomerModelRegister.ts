import ClientType from "./ClientType";

class CustomerModelRegister {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  clientType: ClientType;
  password: number;
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: number,
    clientType: ClientType
  ) {
    this.id = id;
    this.clientType = clientType;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}

export default CustomerModelRegister;
