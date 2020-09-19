import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  dynamicForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.dynamicForm = this.formBuilder.group({
      numberOfUsers: ['', Validators.required],
      users: new FormArray([])
    });
  }

  get f() { return this.dynamicForm.controls; }
  get t() { return this.f.users as FormArray; }
  get userFormGroups() { return this.t.controls as FormGroup[]; }

  onChangeUsers(e) {
    const numberOfUsers = e.target.value || 0;
    if (this.t.length < numberOfUsers) {
      for (let i = this.t.length; i < numberOfUsers; i++) {
        this.t.push(this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          username: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', Validators.required],
          confirmPassword: ['', Validators.required]
        }));
      }
    }
    else {
      for (let i = this.t.length; i >= numberOfUsers; i--) {
        this.t.removeAt(i);
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.dynamicForm.invalid)
      return;
    alert('SUCCESS!!!' + JSON.stringify(this.dynamicForm.value, null, 4));
  }

  onReset(){
    this.submitted = false;
    this.dynamicForm.reset();
    this.t.clear();
  }

  onClear() {
    this.submitted = false;
    this.t.reset();
  }

  showHideForm() {}
}
