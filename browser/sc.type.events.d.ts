export module sc.type.events {
    class Event {
        public type: string;
        public data: any;
        public _isPropagationStopped: bool;
        public _isPropagationStoppedImmediately: bool;
        public _isDefaultPrevented: bool;
        public currentTarget: EventEmitter;
        constructor(type: string, data?: any);
        public formatToString(): string;
        public stopPropagation(): void;
        public stopImmediatePropagation(): void;
        public preventDefault(): void;
    }
    class EventEmitter {
        private _receivers;
        constructor();
        public on(type: string, listener: Function, useCapture?: bool, priority?: number): EventEmitter;
        public off(type: string, listener: Function): EventEmitter;
        public emit(event: Event): EventEmitter;
    }
}
