import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserTeamModule } from '../userTeam/userTeam.module';
import { UserTeamProjectModule } from '../userTeamProject/userTeamProject.module';
import { MembershipModule } from '../membership/membership.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserTeamModule,
    UserTeamProjectModule,
    MembershipModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
