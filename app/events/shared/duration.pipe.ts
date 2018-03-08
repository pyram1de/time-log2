import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
    name: 'duration'
})
export class DurationPipe implements PipeTransform {
    transform(value: number, ...args: any[]): string {
        switch(value) {
            case 1:
            return 'half hour'
            default:
            return 'longer';
        };
    }
}