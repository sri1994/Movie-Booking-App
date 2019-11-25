import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './containers/admin/admin.component';
import { AddTheaterComponent } from './components/add-theater/add-theater.component';
import { AdminService } from './services/admin.service';
import { ChangeShowComponent } from './components/change-show/change-show.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { SelectComponent } from './components/select/select.component';
import { RadiobuttonComponent } from './components/radiobutton/radiobutton.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DynamicFieldDirective } from './components/dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
@NgModule({
  declarations: [InputComponent, ButtonComponent, SelectComponent,
    RadiobuttonComponent, CheckboxComponent, DynamicFieldDirective, DynamicFormComponent, AdminComponent, AddTheaterComponent, 
    ChangeShowComponent],
  imports: [CommonModule, SharedModule, AdminRoutingModule],
  providers: [AdminService],
  entryComponents: [
    InputComponent,
    ButtonComponent,
    SelectComponent,
    RadiobuttonComponent,
    CheckboxComponent
  ]
})
export class AdminModule {}
