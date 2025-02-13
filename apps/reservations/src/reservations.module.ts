import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { ReservationsRepository } from './reservations.repository';
import { DatabaseModule } from '@app/common';
import { ReservationDocument, ReservationSchema } from './reservations.schema';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports : [
    DatabaseModule , 
    DatabaseModule.forFeature([{name : ReservationDocument.name , schema:ReservationSchema}]),
    LoggerModule.forRoot({
      pinoHttp : {
        transport : {
          target : 'pino-pretty',
          options : {
            singleLine:true
          }
        }
      }
    })
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService , ReservationsRepository],
})
export class ReservationsModule {}
