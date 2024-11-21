import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCoffinDto {
    @ApiProperty({ description: `The name of a coffin.` })
    @IsString()
    readonly brand?: string;
    
    @ApiProperty({ example: [] })
    @IsString({ each: true })
    readonly colors?: string[];
}
