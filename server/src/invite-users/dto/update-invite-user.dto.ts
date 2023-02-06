import { PartialType } from '@nestjs/swagger';
import { CreateInviteUserDto } from './create-invite-user.dto';

export class UpdateInviteUserDto extends PartialType(CreateInviteUserDto) {}
