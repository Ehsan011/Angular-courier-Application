import { Component, OnInit } from '@angular/core';
import {  UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})

export class OrderDetailsComponent implements OnInit {
  
  form: UntypedFormGroup;
  submitted = false;
  order_details: any = [];

  isEdit = false;
  constructor(private fb: UntypedFormBuilder, private http: HttpClient) {
    this.form = fb.group({
      id: [],
      recipientName: ['', Validators.required],
      recipientMobileNo: ['', ],
      recipientAddress: ['', ],
      userLocation: ['Select', ],
      selectProductType: ['Document', ],
      packageWeight: ['Select Weight', ],
      numberOfItem: ['', ],
      payment: ['', ],
      orderActivityStatus: ['', ]
    });
  }
  delivary_man_details: any = [];

  ngOnInit(): void {
    this.showAll();
  }
  get f() {
    return this.form.controls;
  }

  save(){
    this.submitted = true;
    if(this.form.valid){

      let url = 'http://localhost:9001/order/save/';
      let data = this.form.value;
      this.http.post(url, data).subscribe({
        next: response => {
          alert("Data was saved successful.")
          
          this.showAll();
          this.form.reset();
        },
        error: err =>{
          alert("Data was saved failed!, Please try again.")

        }
      });
    }else{
      console.log("invalid");
    }
 }


 showAll(){
  let url = 'http://localhost:9001/order/getall';
  this.http.get(url).subscribe({
    next: response =>{
      this.order_details = response;
    },
    error: err =>{
      console.log(err);        
    }
  })
}


edit(OrderDetails: any){
  this.form.setValue({
    
    id: OrderDetails.id,
    recipientName: OrderDetails.recipientName,
    recipientMobileNo: OrderDetails.recipientMobileNo,
    recipientAddress: OrderDetails.recipientAddress,
    userLocation: OrderDetails.userLocation,
    selectProductType: OrderDetails.selectProductType,
    packageWeight: OrderDetails.packageWeight,
    numberOfItem: OrderDetails.numberOfItem,
    payment: OrderDetails.payment,
    orderActivityStatus: OrderDetails.orderActivityStatus,
    
    

  });
  this.isEdit = true;
}
deleteById(id: number){
  let url = 'http://localhost:9001/order/delete/'+id;
  this.http.get(url).subscribe({
    next: response =>{
      alert("Recored was deleted.");
      this.showAll();
    },
    error: err =>{
      alert("Recored deletation failed!.");
    }
  })
}


        relode(){
          window.location.reload();
        }



}

