import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
    <h1>EV Battery Lifecycle & Warranty</h1>

    <div *ngIf="battery">
      <p><b>ID:</b> {{battery.id}}</p>
      <p><b>Chemistry:</b> {{battery.chemistry}}</p>
      <p><b>Capacity:</b> {{battery.capacityKWh}} kWh</p>
      <p><b>SOH:</b> {{battery.stateOfHealth}}%</p>

      <h3 [style.color]="battery.warrantyEligible ? 'green' : 'red'">
        Warranty {{battery.warrantyEligible ? 'ELIGIBLE' : 'NOT ELIGIBLE'}}
      </h3>
    </div>
  `
})
export class AppComponent implements OnInit {
  battery: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('/api/battery').subscribe(data => {
      this.battery = data;
    });
  }
}