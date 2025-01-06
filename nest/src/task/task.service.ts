import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, Interval, SchedulerRegistry, Timeout } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class TaskService {
    constructor(
        private schedulerRegistry:SchedulerRegistry
    ){
        
        this.addCronJob()
    }

    addCronJob(){
        const name = `cronSample`
        const job = new CronJob(CronExpression.EVERY_SECOND,()=>{
            console.error(`run ${name}`)
        })
        this.schedulerRegistry.addCronJob(name, job)
        console.warn(`job ${name} added!`)
    }

    @Cron(CronExpression.EVERY_SECOND,{name:'cronTask'})
    handleCron(){
        console.log('Task called')
    }

    @Interval('intervalTask',3000)
    handleInterval(){
        console.log('Interval called')
    }

    @Timeout('timeoutTask',5000)
    handelTimeout(){
        console.log('Timeout called')
    }
}
