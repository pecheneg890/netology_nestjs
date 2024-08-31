type func = ()=>string;

function LogTime() {
    return (target: Object, propertyName: string, descriptor: TypedPropertyDescriptor<func>) => {
        const method = descriptor.value;
        descriptor.value = function() {
            console.time(propertyName || 'LogTime');
            const result: string = "extend function result " + method.apply(this);
            console.timeEnd(propertyName || 'LogTime');
            return result;
        };
    };
}

class TestServiceDeco {
    @LogTime()
        testLogging(): string {
       return "original function";
    }
}

const obj = new TestServiceDeco();
console.log(obj.testLogging());