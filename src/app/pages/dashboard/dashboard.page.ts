import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BottomTabsComponent } from 'src/app/components/bottom-tabs/bottom-tabs.component';

interface FlightStat {
  title: string;
  value: number;
  icon: string;
  color: string;
}

interface RecentFlight {
  id: string;
  flightNumber: string;
  origin: string;
  destination: string;
  time: string;
  status: 'on-time' | 'delayed' | 'boarding';
  statusText: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, BottomTabsComponent],
})
export class DashboardPage implements OnInit {
  flightStats: FlightStat[] = [
    {
      title: 'Vuelos Activos',
      value: 24,
      icon: 'airplane',
      color: 'primary',
    },
    {
      title: 'Programados Hoy',
      value: 156,
      icon: 'calendar',
      color: 'secondary',
    },
    {
      title: 'Aeropuertos',
      value: 42,
      icon: 'business',
      color: 'tertiary',
    },
    {
      title: 'Alertas',
      value: 3,
      icon: 'warning',
      color: 'warning',
    },
  ];

  recentFlights: RecentFlight[] = [
    {
      id: '1',
      flightNumber: 'AA1234',
      origin: 'BOG',
      destination: 'MDE',
      time: '10:30',
      status: 'on-time',
      statusText: 'A Tiempo',
    },
    {
      id: '2',
      flightNumber: 'LA5678',
      origin: 'CLO',
      destination: 'BOG',
      time: '11:15',
      status: 'delayed',
      statusText: 'Demorado',
    },
    {
      id: '3',
      flightNumber: 'AV9012',
      origin: 'MDE',
      destination: 'CTG',
      time: '12:00',
      status: 'boarding',
      statusText: 'Abordando',
    },
    {
      id: '4',
      flightNumber: 'VV2847',
      origin: 'BOG',
      destination: 'SMR',
      time: '13:45',
      status: 'on-time',
      statusText: 'A Tiempo',
    },
  ];

  currentTime: string = '';
  currentDate: string = '';
  userName: string = 'Administrador';

  constructor() {}

  ngOnInit() {
    this.updateDateTime();
    // Actualizar cada minuto
    setInterval(() => {
      this.updateDateTime();
    }, 60000);
  }

  private updateDateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
    });
    this.currentDate = now.toLocaleDateString('es-CO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'on-time':
        return 'success';
      case 'delayed':
        return 'warning';
      case 'boarding':
        return 'primary';
      default:
        return 'medium';
    }
  }

  onFlightClick(flight: RecentFlight) {
    console.log('Flight clicked:', flight);
    // Aquí podrías navegar a los detalles del vuelo
  }

  onStatClick(stat: FlightStat) {
    console.log('Stat clicked:', stat);
    // Aquí podrías navegar a la sección correspondiente
  }

  doRefresh(event: any) {
    console.log('Begin async operation');

    // Simular carga de datos
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
