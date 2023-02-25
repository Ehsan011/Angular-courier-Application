import { Component, OnInit, ViewChild } from '@angular/core';
import {  NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit{
@ViewChild('serch')serch?: NgForm;

  order_details: any = [];
  orderD:any[] = [];
  serchResult:any;
  form: UntypedFormGroup;


  ngOnInit(): void {
    this.showAll();
  }

  constructor(private fb: UntypedFormBuilder, private http: HttpClient) {
    this.form = fb.group({
      id: [],

      senderName: ['',],
      senderCell: ['', ],
      senderAddress: ['', ],
      userLocation: ['Select', ],

      recipientLocation: ['', ],
      recipientName: ['', Validators.required],
      recipientMobileNo: ['', ],
      recipientAddress: ['', ],

      selectProductType: ['Document', ],
      packageWeight: ['Select Weight', ],
      numberOfItem: ['', ],
      payment: ['', ],
      orderActivityStatus: ['', ],
     
      
    });
  }

  showAll(){
    let url = 'http://localhost:9001/order/getall';
    this.http.get(url).subscribe(
     data => {
      this.order_details = data;
      this.orderD = this.order_details
     console.log(this.orderD);
     }
    )
  }

  searched = false;

  searchByid(){
    console.log(this.serch?.value.serchId);
    console.log(this.orderD)
    this.serchResult =this.orderD.find(trid=>trid.orderTrakingNumber == this.serch?.value.serchId)
    this.searched = true;
    console.log(this.serchResult)
}
}
