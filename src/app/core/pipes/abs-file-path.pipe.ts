import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'absFilePath'
})
export class AbsFilePathPipe implements PipeTransform {
    
    transform(value: any, ...args: any[]) {
        
        const baseUrl: string = 'http://localhost:8080/api/';
        const relativePath: string = value;
        const absPath: string = baseUrl + relativePath;

        return absPath;
    }

}