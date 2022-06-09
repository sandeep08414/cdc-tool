import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveWithNoCoverageComponent } from './save-with-no-coverage.component';
import { FormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';



@NgModule({
  declarations: [SaveWithNoCoverageComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[SaveWithNoCoverageComponent ],
})
export class SaveWithNoCoverageModule { }
