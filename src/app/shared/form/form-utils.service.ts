import { Injectable } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  constructor() { }

  validateAllFormFields(formGroup: UntypedFormGroup | UntypedFormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if(control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if(control instanceof UntypedFormArray || control instanceof UntypedFormGroup) {
        control.markAsTouched({ onlySelf: true });
        this.validateAllFormFields(control);
      }
    });
  }

  public getErrorMessage(formGroup: UntypedFormGroup, fieldName: string) {
    const field = formGroup.get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFromField(field);
  }

  public getErrorMessageFromField(field: UntypedFormControl) {

    if(field?.hasError('required'))
      return "Campo Obrigatorio";
    if(field?.hasError('minlength')) {
      const requiredLength = field?.errors ? field?.errors['minlength']['requiredLength'] : 5;
      return `Tamanho minimo precisa ser de ${requiredLength} caracteres.`;
    }
    if(field?.hasError('maxlength')) {
      const requiredLength = field?.errors ? field?.errors['maxlength']['requiredLength'] : 200;
      return `Tamanho maximo excedido de ${requiredLength} caracteres.`;
    }

    return "Campo Invalido";
  }

  getFormArrayFieldErrorMessage(formGroup: UntypedFormGroup, formArrayName: string, fieldName: string, index: number) {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    const field = formArray.controls[index].get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFromField(field);
  }

  isFormArrayRequired(formGroup: UntypedFormGroup, formArrayName: string) {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    return !formArray.valid && formArray.hasError('required') && formArray.touched;
  }
}
