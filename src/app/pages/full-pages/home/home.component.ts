import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'app/core/model/customer.model';
import { CustomerService } from 'app/core/services/customer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class HomeComponent implements OnInit {
  isLoaded: boolean = false;
  public form = new FormGroup({
    id:new FormControl('',[]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthDate: new FormControl('', Validators.required)
  });
  itens: any;
  customerEdit: Customer;

  constructor(private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private customerService: CustomerService
  ) {
  }

  ngOnInit(): void {
    console.warn('asdf');
    var obj: Customer = {
      birthdate: new Date('1987-10-01'),
      name: 'teste',
      email: 'etste@teste.com'
    }
    this.customerService.create(obj).subscribe(() => {
      var teste = this;
    });
    this.customerService.get().subscribe((result) => {
      console.log(result);
      this.itens = result;
    });
  }

  excluirCustomer(customerId) {
    this.customerService.delete(customerId).subscribe((result) => {
      console.log(result);
    });
  }

  submit() {
    if (this.form.status === 'VALID') {
      console.log(this.form.value);
      this.customerService.update(this.form.value).subscribe((result) => {
        console.log(result);
      });
    }
  }

  setValue(customer) {
    this.form.setValue({id: customer.id, name: customer.name, email: customer.email, birthDate: customer.birthDate});
  }

}
