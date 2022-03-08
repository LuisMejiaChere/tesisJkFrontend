import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

@Injectable()

export class ErrorService {

    constructor() {}

    obtenerFormularioValidacion(form: NgForm): string[] {
        const messages: string[] = [];
        Object.keys(form.controls).forEach(k => {
          this.obtenerMensajesDeValidacion(form.controls[k], k)
            .forEach(m => messages.push(m));
        });
        return messages;
      }

      obtenerMensajesDeValidacion(state: any, thingName?: string) {
        const thing: string = state.path || thingName;
        const messages: string[] = [];
        if (state.errors) {
          // tslint:disable-next-line: forin
          for (const errorName in state.errors) {
            switch (errorName) {
              case 'required':
                messages.push(`El campo "${thing}" es requerido.`); break;
            }
          }
        }
        return messages;
      }

}
