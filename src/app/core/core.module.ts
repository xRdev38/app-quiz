import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, LocalService } from '@core/services';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '@core/components';

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [CommonModule, HttpClientModule],
  providers: [ApiService, LocalService],
})
export class CoreModule {}
