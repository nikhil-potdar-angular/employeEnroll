import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'employee-enrollment-wizard';
  st1: boolean = true
  st2: boolean = false
  form!: FormGroup
  empForm!: FormGroup
  range: number = 0
  remainingAmount: number = 0
  amount: number = 0
  arr: any = []
  constructor(private fb: FormBuilder) {

  }
  ngOnInit() {
    this.initForm();
    this.initEmpForm();
  }
  initForm() {
    this.form = this.fb.group({
      fullName: [''],
      salary: [''],
      address: [''],
    })
  }

  initEmpForm() {
    this.empForm = this.fb.group({
      items: new FormArray([this.createItem()]),
    })
    this.arr = this.empForm.get('items')?.value

  }

  changeRange(e: any, index: number) {
    this.range = e.target.value
    this.amount = this.range * this.form.get('salary')?.value / 100
    this.arr[index].percentage = this.range
    this.arr[index].amount = this.amount
    let totalAmount = this.arr.reduce((t: number, e: any) => {
      t += e.amount
      return t
    }, 0)
    this.remainingAmount = this.form.get('salary')?.value - totalAmount

  }
  typeChange() {
    
  }

  get items() {
    return this.empForm.get('items') as FormArray;
  }
  createItem() {
    return this.fb.group({
      type: [''],
      percentage: [0],
      amount: [0],
    })
  }
  finish() {
    console.log(this.arr)
  }

  addItem() {
    this.items.push(this.createItem())
    this.arr = this.empForm.get('items')?.value

  }
  removeItem(i: any) {
    this.items.removeAt(i)
  }


  step2() {
    this.st1 = !this.st1
    this.st2 = !this.st2
    this.remainingAmount = this.form.get('salary')?.value
    this.range = 0
    this.amount = 0
  }
  step1() {
    this.st1 = !this.st1
    this.st2 = !this.st2
  }

}
