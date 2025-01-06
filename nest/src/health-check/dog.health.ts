import { Injectable } from "@nestjs/common";
import { HealthCheckError, HealthIndicator } from "@nestjs/terminus";

export interface Dog {
    name:string,
    type:string
}
@Injectable()
export class DogHealthIndicator extends HealthIndicator{
    private dogs: Dog[] = [
        {
            name:'fido',type:'good'
        },
        {
            name:'rex',
            type:'good'
        }
    ]
    async isHealthy(key:string){
        const bad = this.dogs.filter(dog=>dog.type==='bad')
        const isHealthy = bad.length === 0
        const result = this.getStatus(key,isHealthy,{bad:bad.length})
        if(isHealthy){
            return result;
        }
        throw new HealthCheckError('dogcheck failed', result)
    }
}