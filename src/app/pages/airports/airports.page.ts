import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  IonicModule,
  ActionSheetController,
  AlertController,
  ToastController,
} from '@ionic/angular';
import { BottomTabsComponent } from 'src/app/components/bottom-tabs/bottom-tabs.component';

interface Airport {
  id: string;
  code: string;
  name: string;
  city: string;
  country: string;
  status: 'active' | 'maintenance' | 'closed';
  statusText: string;
  todayFlights: number;
  destinations: number;
  operationalPercentage: number;
  runways: number;
  terminals: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

@Component({
  selector: 'app-airports',
  templateUrl: './airports.page.html',
  styleUrls: ['./airports.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule,
    BottomTabsComponent,
  ],
})
export class AirportsPage implements OnInit {
  airports: Airport[] = [
    {
      id: '1',
      code: 'BOG',
      name: 'Aeropuerto Internacional El Dorado',
      city: 'Bogotá',
      country: 'Colombia',
      status: 'active',
      statusText: 'Operativo',
      todayFlights: 245,
      destinations: 87,
      operationalPercentage: 98,
      runways: 2,
      terminals: 2,
      coordinates: { lat: 4.7016, lng: -74.1469 },
    },
    {
      id: '2',
      code: 'MDE',
      name: 'Aeropuerto Internacional José María Córdova',
      city: 'Medellín',
      country: 'Colombia',
      status: 'active',
      statusText: 'Operativo',
      todayFlights: 156,
      destinations: 42,
      operationalPercentage: 95,
      runways: 1,
      terminals: 1,
      coordinates: { lat: 6.1645, lng: -75.4223 },
    },
    {
      id: '3',
      code: 'CLO',
      name: 'Aeropuerto Internacional Alfonso Bonilla Aragón',
      city: 'Cali',
      country: 'Colombia',
      status: 'active',
      statusText: 'Operativo',
      todayFlights: 98,
      destinations: 28,
      operationalPercentage: 92,
      runways: 1,
      terminals: 1,
      coordinates: { lat: 3.543, lng: -76.3816 },
    },
    {
      id: '4',
      code: 'CTG',
      name: 'Aeropuerto Internacional Rafael Núñez',
      city: 'Cartagena',
      country: 'Colombia',
      status: 'maintenance',
      statusText: 'Mantenimiento',
      todayFlights: 45,
      destinations: 15,
      operationalPercentage: 75,
      runways: 1,
      terminals: 1,
      coordinates: { lat: 10.4424, lng: -75.513 },
    },
    {
      id: '5',
      code: 'SMR',
      name: 'Aeropuerto Internacional Simón Bolívar',
      city: 'Santa Marta',
      country: 'Colombia',
      status: 'active',
      statusText: 'Operativo',
      todayFlights: 67,
      destinations: 12,
      operationalPercentage: 88,
      runways: 1,
      terminals: 1,
      coordinates: { lat: 11.1196, lng: -74.2306 },
    },
    {
      id: '6',
      code: 'PTY',
      name: 'Aeropuerto Internacional de Tocumen',
      city: 'Ciudad de Panamá',
      country: 'Panamá',
      status: 'active',
      statusText: 'Operativo',
      todayFlights: 312,
      destinations: 94,
      operationalPercentage: 97,
      runways: 2,
      terminals: 2,
      coordinates: { lat: 9.0714, lng: -79.3835 },
    },
    {
      id: '7',
      code: 'UIO',
      name: 'Aeropuerto Internacional Mariscal Sucre',
      city: 'Quito',
      country: 'Ecuador',
      status: 'closed',
      statusText: 'Cerrado',
      todayFlights: 0,
      destinations: 0,
      operationalPercentage: 0,
      runways: 1,
      terminals: 1,
      coordinates: { lat: -0.1292, lng: -78.3575 },
    },
    {
      id: '8',
      code: 'LIM',
      name: 'Aeropuerto Internacional Jorge Chávez',
      city: 'Lima',
      country: 'Perú',
      status: 'active',
      statusText: 'Operativo',
      todayFlights: 198,
      destinations: 56,
      operationalPercentage: 94,
      runways: 1,
      terminals: 1,
      coordinates: { lat: -12.0219, lng: -77.1143 },
    },
  ];

  filteredAirports: Airport[] = [];
  searchTerm: string = '';
  selectedStatus: string = '';
  selectedCountry: string = '';
  viewMode: 'grid' | 'list' = 'grid';

  // Opciones para filtros
  countries: string[] = [];
  statusOptions = [
    { value: 'active', label: 'Operativo' },
    { value: 'maintenance', label: 'Mantenimiento' },
    { value: 'closed', label: 'Cerrado' },
  ];

  constructor(
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.filteredAirports = [...this.airports];
    this.extractCountries();
  }

  private extractCountries() {
    this.countries = [
      ...new Set(this.airports.map((airport) => airport.country)),
    ].sort();
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
    this.filteredAirports = this.airports.filter((airport) => {
      const matchesSearch =
        !this.searchTerm ||
        airport.code.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        airport.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        airport.city.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        airport.country.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesStatus =
        !this.selectedStatus || airport.status === this.selectedStatus;
      const matchesCountry =
        !this.selectedCountry || airport.country === this.selectedCountry;

      return matchesSearch && matchesStatus && matchesCountry;
    });
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedStatus = '';
    this.selectedCountry = '';
    this.filteredAirports = [...this.airports];
  }

  toggleViewMode() {
    this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
  }

  // Acciones de aeropuerto
  async onAirportAction(airport: Airport) {
    const actionSheet = await this.actionSheetController.create({
      header: `${airport.code} - ${airport.name}`,
      buttons: [
        {
          text: 'Ver Detalles',
          icon: 'information-circle',
          handler: () => {
            this.viewAirportDetails(airport);
          },
        },
        {
          text: 'Ver Vuelos',
          icon: 'airplane',
          handler: () => {
            this.viewAirportFlights(airport);
          },
        },
        {
          text: 'Editar Aeropuerto',
          icon: 'create',
          handler: () => {
            this.editAirport(airport);
          },
        },
        {
          text: 'Cambiar Estado',
          icon: 'swap-horizontal',
          handler: () => {
            this.changeAirportStatus(airport);
          },
        },
        {
          text: 'Eliminar',
          icon: 'trash',
          role: 'destructive',
          handler: () => {
            this.deleteAirport(airport);
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

  viewAirportDetails(airport: Airport) {
    console.log('Ver detalles del aeropuerto:', airport);
    // Aquí navegarías a una página de detalles
  }

  viewAirportFlights(airport: Airport) {
    console.log('Ver vuelos del aeropuerto:', airport);
    // Aquí navegarías a vuelos filtrados por aeropuerto
  }

  async editAirport(airport: Airport) {
    console.log('Editar aeropuerto:', airport);
    const toast = await this.toastController.create({
      message: 'Función de edición en desarrollo',
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

  async changeAirportStatus(airport: Airport) {
    const alert = await this.alertController.create({
      header: 'Cambiar Estado',
      message: `Selecciona el nuevo estado para ${airport.code}`,
      inputs: this.statusOptions.map((status) => ({
        name: 'status',
        type: 'radio',
        label: status.label,
        value: status.value,
        checked: airport.status === status.value,
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
                airport.status = data;
                airport.statusText = selectedStatus.label;
                this.showToast(`Estado actualizado a: ${selectedStatus.label}`);
              }
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async deleteAirport(airport: Airport) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de que deseas eliminar el aeropuerto ${airport.code}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.airports = this.airports.filter((a) => a.id !== airport.id);
            this.applyFilters();
            this.showToast('Aeropuerto eliminado correctamente');
          },
        },
      ],
    });
    await alert.present();
  }

  async addNewAirport() {
    const toast = await this.toastController.create({
      message: 'Función de agregar aeropuerto en desarrollo',
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'active':
        return 'success';
      case 'maintenance':
        return 'warning';
      case 'closed':
        return 'danger';
      default:
        return 'medium';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'active':
        return 'checkmark-circle';
      case 'maintenance':
        return 'construct';
      case 'closed':
        return 'close-circle';
      default:
        return 'help-circle';
    }
  }

  getOperationalColor(percentage: number): string {
    if (percentage >= 95) return 'success';
    if (percentage >= 80) return 'warning';
    return 'danger';
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
    console.log('Refreshing airports...');
    setTimeout(() => {
      this.applyFilters();
      event.target.complete();
      this.showToast('Aeropuertos actualizados');
    }, 1500);
  }
}
