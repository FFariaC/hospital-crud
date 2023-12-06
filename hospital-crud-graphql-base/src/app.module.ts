import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { GraphQLModule } from '@nestjs/graphql'
import { AppointmentModule } from './appointment/appointment.module';
import { HealthPlanModule } from './health-plan/health-plan.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import config from '../ormconfig';
@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true
    }),

    PersonModule,
    AppointmentModule,
    HealthPlanModule,
    TypeOrmModule.forRoot(config)
  ],
  providers: [AppService],
})
export class AppModule {}
