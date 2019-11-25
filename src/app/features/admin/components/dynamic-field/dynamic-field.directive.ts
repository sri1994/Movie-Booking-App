import {
  ComponentFactoryResolver, ComponentRef, Directive, Input, OnInit,
  ViewContainerRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from './../../interfaces/field.interface';
import { InputComponent } from './../input/input.component';
import { ButtonComponent } from './../button/button.component';
import { SelectComponent } from './../select/select.component';
import { RadiobuttonComponent } from './../radiobutton/radiobutton.component';
import { CheckboxComponent } from './../checkbox/checkbox.component';

@Directive({
  selector: '[appDynamicField]'
})
export class DynamicFieldDirective implements OnInit {

  @Input() field: FieldConfig;
  @Input() group: FormGroup;

  componentRef: any;

  private componentMapper: any = {
    input: InputComponent,
    button: ButtonComponent,
    select: SelectComponent,
    radiobutton: RadiobuttonComponent,
    checkbox: CheckboxComponent
  };

  constructor(private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef) { }

  ngOnInit(): void {
    console.log('IN DIRECTIVE :', this.field);
    const factory = this.resolver.resolveComponentFactory(
      this.componentMapper[this.field.type]
    );

    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
  }

}

