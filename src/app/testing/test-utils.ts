import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

export class TestUtils {
  static configureTestingModule(components: Type<any>[], providers: any[] = []) {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: components,
      providers: providers
    });
  }
}
