export module sc.type.utils {

  export module String {

    export function padLeft(value:any, pad:string, len:number):string {
      var str:string = '' + value;
      while (str.length < len) {
        str = pad + str;
      }
      return str;
    }

    export function padRight(value:any, pad:string, len:number):string {
      var str:string = '' + value;
      while (str.length < len) {
        str += pad;
      }
      return str;
    }

  }

}