import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserTeamModule } from '../userTeam/userTeam.module';
import { UserTeamProjectModule } from '../teamProject/userProject.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserTeamModule,
    UserTeamProjectModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
