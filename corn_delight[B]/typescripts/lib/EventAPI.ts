export class EventAPI {
    public static register = (event: any, option: any = undefined): MethodDecorator => {
        return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
            if (option) {
                event.subscribe((args: any) => {
                    descriptor.value(args);
                }, option)
            } else {
                event.subscribe((args: any) => {
                    descriptor.value(args);
                })
            }
        }
    }
}

