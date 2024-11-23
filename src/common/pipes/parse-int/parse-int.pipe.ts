import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from '@nestjs/common';

// custom pipe used in route handler arguments
@Injectable()
export class CustomParseIntPipe implements PipeTransform {
    transform(value: string, metadata: ArgumentMetadata) {
        const val = parseInt(value, 10);
        if (isNaN(val)) {
            throw new BadRequestException(
                `Validation failed "${val}" is not an integer`,
            );
        }
        return val;
    }
}
