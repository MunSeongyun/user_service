import { Injectable } from '@nestjs/common';
import { Cron, Interval } from '@nestjs/schedule';

@Injectable()
export class TaskService {
    @Cron('* * * * * *',{name:'cronTask'})
    handleCron(){
        console.log('Task called')
    }

    @Interval('intervalTask',3000)
    handleInterval(){
        console.log('Interval called')
    }
}
