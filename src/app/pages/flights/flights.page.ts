import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BottomTabsComponent } from 'src/app/components/bottom-tabs/bottom-tabs.component';

import {
  IonicModule,
  ActionSheetController,
  AlertController,
  ToastController,
} from '@ionic/angular';

interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  date: string;
  status: 'on-time' | 'delayed' | 'boarding' | 'departed' | 'cancelled';
  statusText: string;
  emptySeats: number;
  aircraft: string;
  gate?: string;
}

@Component({
  selector: 'app-flights',
  templateUrl: './flights.page.html',
  styleUrls: ['./flights.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule,
    BottomTabsComponent,
  ],
})
export class FlightsPage implements OnInit {
  flights: Flight[] = [
    {
      id: '1',
      flightNumber: 'AA1234',
      airline: 'Avianca',
      origin: 'BOG',
      destination: 'MDE',
      departureTime: '10:30',
      arrivalTime: '11:45',
      date: '2024-02-04',
      status: 'on-time',
      statusText: 'A Tiempo',
      emptySeats: 45,
      aircraft: 'A320',
      gate: 'A12',
    },
    {
      id: '2',
      flightNumber: 'LA5678',
      airline: 'LATAM',
      origin: 'CLO',
      destination: 'BOG',
      departureTime: '11:15',
      arrivalTime: '12:30',
      date: '2024-02-04',
      status: 'delayed',
      statusText: 'Demorado',
      emptySeats: 23,
      aircraft: 'B737',
      gate: 'B05',
    },
    {
      id: '3',
      flightNumber: 'AV9012',
      airline: 'Avianca',
      origin: 'MDE',
      destination: 'CTG',
      departureTime: '12:00',
      arrivalTime: '13:15',
      date: '2024-02-04',
      status: 'boarding',
      statusText: 'Abordando',
      emptySeats: 12,
      aircraft: 'A319',
      gate: 'C08',
    },
    {
      id: '4',
      flightNumber: 'VV2847',
      airline: 'Viva Air',
      origin: 'BOG',
      destination: 'SMR',
      departureTime: '13:45',
      arrivalTime: '15:00',
      date: '2024-02-04',
      status: 'departed',
      statusText: 'Despegó',
      emptySeats: 0,
      aircraft: 'A320',
    },
    {
      id: '5',
      flightNumber: 'CM3456',
      airline: 'Copa Airlines',
      origin: 'BOG',
      destination: 'PTY',
      departureTime: '14:20',
      arrivalTime: '16:45',
      date: '2024-02-04',
      status: 'on-time',
      statusText: 'A Tiempo',
      emptySeats: 67,
      aircraft: 'B737',
      gate: 'D15',
    },
    {
      id: '6',
      flightNumber: 'JA7890',
      airline: 'JetSMART',
      origin: 'MDE',
      destination: 'LIM',
      departureTime: '15:30',
      arrivalTime: '18:00',
      date: '2024-02-04',
      status: 'cancelled',
      statusText: 'Cancelado',
      emptySeats: 0,
      aircraft: 'A320',
    },
  ];

  filteredFlights: Flight[] = [];
  searchTerm: string = '';
  selectedStatus: string = '';
  selectedOrigin: string = '';
  selectedDestination: string = '';
  isFilterOpen: boolean = false;

  // Opciones para filtros
  airports = ['BOG', 'MDE', 'CLO', 'CTG', 'SMR', 'PTY', 'LIM'];
  statusOptions = [
    { value: 'on-time', label: 'A Tiempo' },
    { value: 'delayed', label: 'Demorado' },
    { value: 'boarding', label: 'Abordando' },
    { value: 'departed', label: 'Despegó' },
    { value: 'cancelled', label: 'Cancelado' },
  ];

  constructor(
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.filteredFlights = [...this.flights];
  }

  // Búsqueda y filtros
  onSearchChange(event: any) {
    this.searchTerm = event.detail.value;
    this.applyFilters();
  }

  onFilterChange() {
    this.applyFilters();
  }

  applyFilters() {
    this.filteredFlights = this.flights.filter((flight) => {
      const matchesSearch =
        !this.searchTerm ||
        flight.flightNumber
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        flight.airline.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        flight.origin.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        flight.destination
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());

      const matchesStatus =
        !this.selectedStatus || flight.status === this.selectedStatus;
      const matchesOrigin =
        !this.selectedOrigin || flight.origin === this.selectedOrigin;
      const matchesDestination =
        !this.selectedDestination ||
        flight.destination === this.selectedDestination;

      return (
        matchesSearch && matchesStatus && matchesOrigin && matchesDestination
      );
    });
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedStatus = '';
    this.selectedOrigin = '';
    this.selectedDestination = '';
    this.filteredFlights = [...this.flights];
    this.isFilterOpen = false;
  }

  toggleFilters() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  // Acciones de vuelo
  async onFlightAction(flight: Flight) {
    const actionSheet = await this.actionSheetController.create({
      header: `Vuelo ${flight.flightNumber}`,
      buttons: [
        {
          text: 'Ver Detalles',
          icon: 'information-circle',
          handler: () => {
            this.viewFlightDetails(flight);
          },
        },
        {
          text: 'Editar Vuelo',
          icon: 'create',
          handler: () => {
            this.editFlight(flight);
          },
        },
        {
          text: 'Cambiar Estado',
          icon: 'swap-horizontal',
          handler: () => {
            this.changeFlightStatus(flight);
          },
        },
        {
          text: 'Eliminar',
          icon: 'trash',
          role: 'destructive',
          handler: () => {
            this.deleteFlight(flight);
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  viewFlightDetails(flight: Flight) {
    console.log('Ver detalles del vuelo:', flight);
    // Aquí navegarías a una página de detalles
  }

  async editFlight(flight: Flight) {
    console.log('Editar vuelo:', flight);
    const toast = await this.toastController.create({
      message: 'Función de edición en desarrollo',
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

  async changeFlightStatus(flight: Flight) {
    const alert = await this.alertController.create({
      header: 'Cambiar Estado',
      message: `Selecciona el nuevo estado para el vuelo ${flight.flightNumber}`,
      inputs: this.statusOptions.map((status) => ({
        name: 'status',
        type: 'radio',
        label: status.label,
        value: status.value,
        checked: flight.status === status.value,
      })),
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Actualizar',
          handler: (data) => {
            if (data) {
              const selectedStatus = this.statusOptions.find(
                (s) => s.value === data
              );
              if (selectedStatus) {
                flight.status = data;
                flight.statusText = selectedStatus.label;
                this.showToast(`Estado actualizado a: ${selectedStatus.label}`);
              }
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async deleteFlight(flight: Flight) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de que deseas eliminar el vuelo ${flight.flightNumber}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.flights = this.flights.filter((f) => f.id !== flight.id);
            this.applyFilters();
            this.showToast('Vuelo eliminado correctamente');
          },
        },
      ],
    });
    await alert.present();
  }

  async addNewFlight() {
    const toast = await this.toastController.create({
      message: 'Función de agregar vuelo en desarrollo',
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'on-time':
        return 'success';
      case 'delayed':
        return 'warning';
      case 'boarding':
        return 'primary';
      case 'departed':
        return 'medium';
      case 'cancelled':
        return 'danger';
      default:
        return 'medium';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'on-time':
        return 'checkmark-circle';
      case 'delayed':
        return 'time';
      case 'boarding':
        return 'people';
      case 'departed':
        return 'airplane';
      case 'cancelled':
        return 'close-circle';
      default:
        return 'help-circle';
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

  doRefresh(event: any) {
    console.log('Refreshing flights...');
    setTimeout(() => {
      // Simular actualización de datos
      this.applyFilters();
      event.target.complete();
      this.showToast('Vuelos actualizados');
    }, 1500);
  }
}
