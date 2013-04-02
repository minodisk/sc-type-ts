export module sc.type.core {

  export class Class {

    constructor() {
      var ctor:any = (<any>this).constructor;
      var prop:any;
      if (ctor.__fn__ == null) {
        ctor.__fn__ = {};
        for (prop in this) {
          var fn:any = this[prop];
          if (typeof fn === 'function') {
            ctor.__fn__[prop] = fn;
          }
        }
      }
      for (prop in ctor.__fn__) {
        ((prop:any, fn:Function)=> {
          (<any>this)[prop] = ()=> {
            return fn.apply(this, Array.prototype.slice.call(arguments));
          };
        })(prop, ctor.__fn__[prop]);
      }
    }

  }

}
