import { Module } from '@nestjs/common';
import {ConfigService, ConfigModule as NestConfigModule} from '@nestjs/config'
import * as Joi from 'joi'

@Module({
    imports : [NestConfigModule.forRoot({
        isGlobal : true,
        envFilePath : './.env',
        validationSchema : Joi.object ( {
            MONGODB_URI : Joi.string().required(),
        })
    })],
    providers:[ConfigService],
    exports:[ConfigService]
})
export class ConfigModule {}
