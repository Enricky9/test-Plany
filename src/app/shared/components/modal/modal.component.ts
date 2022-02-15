import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  title: string = "Atenção";
  isLoading: boolean = false;
  
  @Input() type;
  @Input() message;
  @Input() name = '';
  @Input() submitEvent: Observable<any>;

  constructor(public activeModal: NgbActiveModal, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (this.type == 'Delete')
      this.message = "Tem certeza que deseja excluir o registro?";
    else if (this.type == 'Archive') {
      this.title = 'Arquivar';
      this.message = 'Arquivar um registro remove da visualização, mas permite que você restaure a qualquer momento. Tem certeza que deseja arquivar?'
    }
  }

  ok() {
    if (this.submitEvent) {
      this.isLoading = true;
      this.submitEvent.subscribe((result) => {
        this.isLoading = false;
        this.activeModal.close(result);
      }, (error) => {
        this.isLoading = false;
      });
    }
    else this.activeModal.close('ok');
  }

}
