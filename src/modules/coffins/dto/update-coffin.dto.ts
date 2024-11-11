import { PartialType } from '@nestjs/mapped-types';
import { CreateCoffinDto } from './create-coffin.dto';

export class UpdateCoffinDto extends PartialType(CreateCoffinDto) {}
