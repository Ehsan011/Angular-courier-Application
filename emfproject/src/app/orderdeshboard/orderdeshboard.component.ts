import { Component, OnInit  } from '@angular/core';
import {  UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-orderdeshboard',
  templateUrl: './orderdeshboard.component.html',
  styleUrls: ['./orderdeshboard.component.css']
})

export class OrderdeshboardComponent implements OnInit{

  base = "http://localhost:9001/get_available_dlm/"
  statuseUpdateUrl="http://localhost:9001/status/"

 
  form: UntypedFormGroup;
  submitted = false;
  order_details:  any = [];
  delivary_man_details: any = [];
  isEdit = false;
 

  constructor(private fb: UntypedFormBuilder, private http: HttpClient) {
    this.form = fb.group({
      id: [],
      recipientName: ['',],
      recipientMobileNo: ['', ],
      recipientAddress: ['', ],
      userLocation: ['', ],
      selectProductType: ['', ],
      packageWeight: ['', ],
      numberOfItem: ['', ],
      payment: ['', ],
      orderActivityStatus: ['', ],
    });

    // this.form = fb.group({
    //   id: [],
    //   //  heroName: ['', Validators.required],
    //   //  heroCell: ['', ],
    //   //  heroEmail: ['', ],
    //   //  heroPassword: ['', ],
    //   //  heroAddress: ['', ],
    //   //  heroLocation: ['Select', ],
    //   //  heroStatus: ['', ],
    //   //  empid: ['', ]
       
    //  });
   }

  ngOnInit(): void {
    this.showAlldelivary();
    this.showAll();
  }

  edit(OrderDetails: any){
    this.form.patchValue({
      
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
  // statusupdateOne(){
  //     this.submitted=true;
  //     let url='http://localhost:9001/order/pro/';
  //     let data=this.form.value;
  //     this.http.post(url, data).subscribe({
  //       next: response => {
  //         alert("Order Assing by delivery man.")
  //         this.showAll();
  //       },
  //       error:err=>{
  //         alert("assing fileds")
  //       }
  //     });
  // }

  pro?:any;

  statusupdateOne(value:any){
    this.pro.value;
      this.submitted=true;
      let data=this.form.value;
      this.http.post(this.statuseUpdateUrl+this.pro, data).subscribe({
        next: response=>{
          alert("Order Assing by delivery man.")
          this.showAll();
        },
        error:err =>{
        alert("assing fileds")
        }
      });
      
  }

  hh?: any;
  
  getBylo(value: any ){
    this.hh=value;
    console.log(this.hh)
    this.http.get(this.base+this.hh).subscribe(
      data => {
        this.delivary_man_details = data,
        console.log(this.delivary_man_details)
      }
    ) 
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
    });
  } 

  showAlldelivary(){
    let url = 'http://localhost:9001/delivary/getall';
    this.http.get(url).subscribe({
      next: response =>{
        this.delivary_man_details = response;
      },
      error: err =>{
        console.log(err);        
      }
    })
  }
  }

