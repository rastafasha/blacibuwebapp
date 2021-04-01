import { NgModule } from '@angular/core';
import {EscapeHtmlPipe} from './keep-html.pipe';
import {KeysPipe} from './keys.pipe';

@NgModule({
  declarations: [
    EscapeHtmlPipe,
    KeysPipe
  ],
  imports: [],
  exports: [
    EscapeHtmlPipe,
    KeysPipe
  ]
})
export class PipesModule { }
