import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  labels1 = ["Eléctrodomesticos", "Tecnologia"];
  data1 = [12, 82];
  colors1 = [
    { backgroundColor: ['#f1c40f', '#c0392b'] }
  ];

  labels2 = ["Samsung", "Apple", "Huawei"];
  data2 = [320, 290, 100];
  colors2 = [
    { backgroundColor: ['#3498db', '#ecf0f1', '#e74c3c'] }
  ];

  labels3 = ['2021', '2022', '2023'];
  data3 = [
    [350, 450, 100],
    [50, 150, 120],
    [250, 130, 70],
  ];
  colors3 = [
    { backgroundColor: ['#8e44ad', '#2ecc71', '#f1c40f'] },
    { backgroundColor: ['#8e44ad', '#2ecc71', '#f1c40f'] },
    { backgroundColor: ['#8e44ad', '#2ecc71', '#f1c40f'] }
  ];
 

}
