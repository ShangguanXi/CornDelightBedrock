export class EventAPI {
}
EventAPI.register = (event, option = undefined) => {
    return (target, propertyKey, descriptor) => {
        if (option) {
            event.subscribe((args) => {
                descriptor.value(args);
            }, option);
        }
        else {
            event.subscribe((args) => {
                descriptor.value(args);
            });
        }
    };
};
//# sourceMappingURL=EventAPI.js.map