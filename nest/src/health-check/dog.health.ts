import { Injectable } from "@nestjs/common";
import { HealthCheckError, HealthIndicator } from "@nestjs/terminus";
import { DataSource } from "typeorm";
import { Dog } from "./dog.entity";


@Injectable()
export class DogHealthIndicator extends HealthIndicator{
    private dogs
    constructor(
        private data:DataSource
    ){
        super();
    }
    
    async isHealthy(key:string){
        this.dogs = await this.data.manager.find(Dog)
        const bad = this.dogs.filter(dog=>dog.type==='bad')
        const isHealthy = bad.length === 0
        const result = this.getStatus(key,isHealthy,{bad:bad.length})
        if(isHealthy){
            return result;
        }
        throw new HealthCheckError('dogcheck failed', result)
    }
}