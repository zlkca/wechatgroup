export class User{
  public username:string;
  public first_name:string;
  public last_name:string;
  public portrait:string;
  public type:string;
    constructor(o?:any){
        if(o){
            this.username = o.username;
            this.first_name = o.first_name;
            this.last_name = o.last_name;
            this.portrait = o.portrait;
            this.type = o.type;
      }
  }
}

