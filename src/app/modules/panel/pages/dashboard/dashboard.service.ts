import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CompraData, topClientes, topProductos, utilidad } from 'src/app/interfaces/dash-board';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://10.16.14.95:7220/api'; // Cambiar a la URL correcta

    constructor(private http: HttpClient) {}
  
    getChartData(): Observable<CompraData[]> {
      return this.http.get<CompraData[]>(`${this.apiUrl}/comprasGeneral`)
        .pipe(
          catchError((error: any) => {
            console.error('Error fetching chart data:', error);
            return of([]); // Valor predeterminado en caso de error
          })
        );
    }


    getDatosClientes():Observable<topClientes[]>{
      return this.http.get<topClientes[]>(`${this.apiUrl}/topClientes`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching chart data:', error);
          return of([]); // Valor predeterminado en caso de error
        })
      );
    }

    getProductos():Observable<topProductos[]>{
      return this.http.get<topProductos[]>(`${this.apiUrl}/MejoresProductos`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching chart data:', error);
          return of([]); // Valor predeterminado en caso de error
        })
      );
    }

    getUtilidad():Observable<utilidad[]>{
      return this.http.get<utilidad[]>(`${this.apiUrl}/Utilidad`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching chart data:', error);
          return of([]); // Valor predeterminado en caso de error
        })
      );
    }
}
