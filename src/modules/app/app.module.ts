import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MembershipModule } from '../membership/membership.module';
import { SpaceRolesModule } from '../space-roles/space-roles.module';
import { SpaceActionsModule } from '../space-actions/space-actions.module';
import { UserSpaceModule } from '../user-space/space.module';
import { UserProfileModule } from '../user-profile/user-profile.module';
import { AnnouncementsModule } from '../announcements/announcements.module';
import { SpacesModulesModule } from '../spaces-modules/spaces-modules.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserSpaceModule,
    UserProfileModule,
    MembershipModule,
    AuthModule,
    SpaceRolesModule,
    AnnouncementsModule,
    SpaceActionsModule,
    SpacesModulesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
