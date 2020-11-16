import {Injectable} from '@angular/core';
import {DatePipe, DecimalPipe} from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class UtilService {
    constructor(private datePipe: DatePipe, private numberPipe: DecimalPipe) {
    }

    dateFormat(date: any) {
        return this.datePipe.transform(date, 'yyyy-MM-ddTH:mm:ss');
    }

    numberFormat(value: any) {
        return this.numberPipe.transform(value, '.2-2');
    }

    dateFormatToShow(date: any) {
        return this.datePipe.transform(date, 'yyyy-MM-dd H:mm');
    }

    dateFormatToShowFormat(date: any, format) {
        return this.datePipe.transform(date, format);
    }

    configDatePicker() {
        return {
            firstDayOfWeek: 1,
            dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
            dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
            dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
            monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo',
                'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
            monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
            today: 'Hoy',
            clear: 'Borrar'
        };
    }


    getPersonLogged() {
        const uss: any = sessionStorage.getItem('user');
        return JSON.parse(uss);
    }
}
