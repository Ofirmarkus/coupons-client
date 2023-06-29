import ClientType from "./ClientType";

class CompanyModelRegister {
  id:number;
  name?: string;
  email?: string;
  clientType?: ClientType;
  password:number;

  constructor (id:number,name:string,email:string,password:number,clientType:ClientType){
  this.id=id;
  this.clientType=clientType;
  this.name=name;
  this.email=email;
  this.password=password;
}

}

export default CompanyModelRegister;
