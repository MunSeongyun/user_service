import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from 'src/task/task.service';

@Module({
    imports:[
        ScheduleModule.forRoot()
    ],
    providers:[TaskService]
})
export class BatchModule {}
