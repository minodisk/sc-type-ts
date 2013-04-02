export module sc.type.events {

  interface Receiver {
    listener:Function;
    useCapture:bool;
    priority:number;
    caller:Function;
  }

  export class Event {

    _isPropagationStopped:bool = false;
    _isPropagationStoppedImmediately:bool = false;
    _isDefaultPrevented:bool = false;

    public currentTarget:EventEmitter;

    constructor(public type:string, public data?:any) {
    }

    public formatToString():string {
      var props:Object = {
          type: this.type
        }
        , key:string
        , tmp:string[] = []
        ;
      for (key in props) {
        tmp.push(key + ': ' + props[key]);
      }
      return '[Event ' + tmp.join(' ') + ']';
    }

    public stopPropagation():void {
      this._isPropagationStopped = true;
    }

    public stopImmediatePropagation():void {
      this._isPropagationStopped = true;
      this._isPropagationStoppedImmediately = true;
    }

    public preventDefault():void {
      this._isDefaultPrevented = true;
    }
  }

  export class EventEmitter {

    private _receivers:Object = {};

    constructor() {
    }

    public on(type:string, listener:Function, useCapture:bool = false, priority:number = 0):EventEmitter {
      if (this._receivers[type] == null) {
        this._receivers[type] = [];
      }
      this._receivers[type].push({
        listener  : listener,
        useCapture: useCapture,
        priority  : priority,
        caller    : this.on.caller
      });
      this._receivers[type].sort((a:Receiver, b:Receiver):number => {
        return b.priority - a.priority;
      });
      return this;
    }

    public off(type:string, listener:Function):EventEmitter {
      var i:number
        , receivers:Receiver[]
        ;
      if (receivers = this._receivers[type]) {
        i = receivers.length;
        while (i--) {
          if (receivers[i].listener === listener) {
            receivers.splice(i, 1);
          }
        }
        if (receivers.length === 0) {
          delete this._receivers[type];
        }
      }
      return this;
    }

    public emit(event:Event):EventEmitter {
      var receivers:Receiver[] = this._receivers[event.type]
        , receiver:Receiver
        , i:number
        , l:number
        ;

      event.currentTarget = this;
      if (receivers == null || receivers.length === 0) {
        return this;
      }

      for (i = 0, l = receivers.length; i < l; i++) {
        receiver = receivers[i];
        ((receiver:Receiver) => {
          setTimeout(() => {
            if (event._isPropagationStoppedImmediately) {
              return;
            }
            receiver.listener.call(receiver.caller, event);
          }, 0);
        })(receiver);
      }
      return this;
    }

  }

}
