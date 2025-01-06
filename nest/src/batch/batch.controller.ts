import { Controller, Post } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';

@Controller('batch')
export class BatchController {
    constructor(private sc:SchedulerRegistry){}

    @Post('/start-sample')
    start(){
        const job = this.sc.getCronJob('cronSample')
        job.start()
        console.log('start')
    }

    @Post('/stop-sample')
    stop(){
        const job = this.sc.getCronJob('cronSample')
        job.stop()
        console.log('stop')
    }
}
