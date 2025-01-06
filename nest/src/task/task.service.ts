import { Injectable } from '@nestjs/common';
import { Cron, Interval, SchedulerRegistry, Timeout } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class TaskService {
    constructor(
        private schedulerRegistry:SchedulerRegistry
    ){
        this.addCronJob()
    }

    addCronJob(){
        const name = 'cronSample'
        const job = new CronJob('* * * * * *',()=>{
            console.error(`run ${name}`)
        })
        this.schedulerRegistry.addCronJob(name, job)
        console.warn(`job ${name} added!`)
    }

    @Cron('* * * * * *',{name:'cronTask'})
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
