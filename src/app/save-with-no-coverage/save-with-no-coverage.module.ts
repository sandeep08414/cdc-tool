import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveWithNoCoverageComponent } from './save-with-no-coverage.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [SaveWithNoCoverageComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[SaveWithNoCoverageComponent ],
})
export class SaveWithNoCoverageModule { }
