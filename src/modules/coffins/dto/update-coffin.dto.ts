import { PartialType } from '@nestjs/swagger';
import { CreateCoffinDto } from './create-coffin.dto';

export class UpdateCoffinDto extends PartialType(CreateCoffinDto) {}
