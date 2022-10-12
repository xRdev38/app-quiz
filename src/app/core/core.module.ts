import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, LocalService } from '@core/services';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '@core/components';
import { SharedModule } from '../shared';

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [CommonModule, HttpClientModule, SharedModule],
  providers: [ApiService, LocalService],
})
export class CoreModule {}
