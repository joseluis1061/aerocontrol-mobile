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

interface FlightProgram {
  id: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  daysOfOperation: string[]; // ['monday', 'tuesday', etc.]
  status: 'active' | 'suspended' | 'seasonal';
  statusText: string;
  aircraft: string;
  frequency: 'daily' | 'weekly' | 'seasonal';
  route: string[];
  duration: string;
  effectiveFrom: string;
  effectiveTo?: string;
}

@Component({
  selector: 'app-programs',
  templateUrl: './programs.page.html',
  styleUrls: ['./programs.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule,
    BottomTabsComponent,
  ],
})
export class ProgramsPage implements OnInit {
  programs: FlightProgram[] = [
    {
      id: '1',
      flightNumber: 'AV2547',
      airline: 'Avianca',
      origin: 'BOG',
      destination: 'MDE',
      departureTime: '10:30',
      arrivalTime: '11:45',
      daysOfOperation: ['monday', 'tuesday', 'wednesday', 'friday'],
      status: 'active',
      statusText: 'Activo',
      aircraft: 'A320',
      frequency: 'weekly',
      route: ['BOG', 'MDE'],
      duration: '1h 15m',
      effectiveFrom: '2024-01-01',
      effectiveTo: '2024-12-31',
    },
    {
      id: '2',
      flightNumber: 'LA1234',
      airline: 'LATAM',
      origin: 'MDE',
      destination: 'CLO',
      departureTime: '14:45',
      arrivalTime: '15:50',
      daysOfOperation: [
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
      ],
      status: 'active',
      statusText: 'Activo',
      aircraft: 'B737',
      frequency: 'weekly',
      route: ['MDE', 'CLO'],
      duration: '1h 05m',
      effectiveFrom: '2024-02-01',
    },
    {
      id: '3',
      flightNumber: 'VV3690',
      airline: 'Viva Air',
      origin: 'BOG',
      destination: 'CTG',
      departureTime: '06:15',
      arrivalTime: '07:30',
      daysOfOperation: ['monday', 'wednesday', 'friday', 'sunday'],
      status: 'active',
      statusText: 'Activo',
      aircraft: 'A320',
      frequency: 'weekly',
      route: ['BOG', 'CTG'],
      duration: '1h 15m',
      effectiveFrom: '2024-01-15',
    },
    {
      id: '4',
      flightNumber: 'CM8907',
      airline: 'Copa Airlines',
      origin: 'BOG',
      destination: 'PTY',
      departureTime: '16:20',
      arrivalTime: '18:45',
      daysOfOperation: [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ],
      status: 'active',
      statusText: 'Activo',
      aircraft: 'B737-800',
      frequency: 'daily',
      route: ['BOG', 'PTY'],
      duration: '2h 25m',
      effectiveFrom: '2024-01-01',
    },
    {
      id: '5',
      flightNumber: 'JA4521',
      airline: 'JetSMART',
      origin: 'BOG',
      destination: 'LIM',
      departureTime: '22:30',
      arrivalTime: '01:15',
      daysOfOperation: ['tuesday', 'thursday', 'saturday'],
      status: 'seasonal',
      statusText: 'Estacional',
      aircraft: 'A320',
      frequency: 'seasonal',
      route: ['BOG', 'LIM'],
      duration: '2h 45m',
      effectiveFrom: '2024-06-01',
      effectiveTo: '2024-08-31',
    },
    {
      id: '6',
      flightNumber: 'AV7834',
      airline: 'Avianca',
      origin: 'MDE',
      destination: 'BOG',
      departureTime: '19:15',
      arrivalTime: '20:30',
      daysOfOperation: ['monday', 'friday'],
      status: 'suspended',
      statusText: 'Suspendido',
      aircraft: 'A319',
      frequency: 'weekly',
      route: ['MDE', 'BOG'],
      duration: '1h 15m',
      effectiveFrom: '2024-01-01',
    },
  ];

  filteredPrograms: FlightProgram[] = [];
  searchTerm: string = '';
  selectedAirline: string = '';
  selectedStatus: string = '';
  selectedOrigin: string = '';
  selectedDestination: string = '';
  isFilterOpen: boolean = false;

  // Opciones para filtros
  airlines: string[] = [];
  airports = ['BOG', 'MDE', 'CLO', 'CTG', 'SMR', 'PTY', 'LIM'];
  statusOptions = [
    { value: 'active', label: 'Activo' },
    { value: 'suspended', label: 'Suspendido' },
    { value: 'seasonal', label: 'Estacional' },
  ];

  // Días de la semana
  weekDays = [
    { key: 'monday', label: 'Lun', fullName: 'Lunes' },
    { key: 'tuesday', label: 'Mar', fullName: 'Martes' },
    { key: 'wednesday', label: 'Mié', fullName: 'Miércoles' },
    { key: 'thursday', label: 'Jue', fullName: 'Jueves' },
    { key: 'friday', label: 'Vie', fullName: 'Viernes' },
    { key: 'saturday', label: 'Sáb', fullName: 'Sábado' },
    { key: 'sunday', label: 'Dom', fullName: 'Domingo' },
  ];

  constructor(
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.filteredPrograms = [...this.programs];
    this.extractAirlines();
  }

  private extractAirlines() {
    this.airlines = [
      ...new Set(this.programs.map((program) => program.airline)),
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
    this.filteredPrograms = this.programs.filter((program) => {
      const matchesSearch =
        !this.searchTerm ||
        program.flightNumber
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        program.airline.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        program.origin.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        program.destination
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());

      const matchesAirline =
        !this.selectedAirline || program.airline === this.selectedAirline;
      const matchesStatus =
        !this.selectedStatus || program.status === this.selectedStatus;
      const matchesOrigin =
        !this.selectedOrigin || program.origin === this.selectedOrigin;
      const matchesDestination =
        !this.selectedDestination ||
        program.destination === this.selectedDestination;

      return (
        matchesSearch &&
        matchesAirline &&
        matchesStatus &&
        matchesOrigin &&
        matchesDestination
      );
    });
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedAirline = '';
    this.selectedStatus = '';
    this.selectedOrigin = '';
    this.selectedDestination = '';
    this.filteredPrograms = [...this.programs];
    this.isFilterOpen = false;
  }

  toggleFilters() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  // Utilidades para días
  isDayActive(program: FlightProgram, dayKey: string): boolean {
    return program.daysOfOperation.includes(dayKey);
  }

  getDayClass(program: FlightProgram, dayKey: string): string {
    return this.isDayActive(program, dayKey) ? 'day-active' : 'day-inactive';
  }

  getOperationDaysText(program: FlightProgram): string {
    if (program.daysOfOperation.length === 7) {
      return 'Diario';
    }

    const activeDays = this.weekDays
      .filter((day) => program.daysOfOperation.includes(day.key))
      .map((day) => day.label);

    return activeDays.join(', ');
  }

  // Acciones de programa
  async onProgramAction(program: FlightProgram) {
    const actionSheet = await this.actionSheetController.create({
      header: `${program.flightNumber} - ${program.airline}`,
      buttons: [
        {
          text: 'Ver Detalles',
          icon: 'information-circle',
          handler: () => {
            this.viewProgramDetails(program);
          },
        },
        {
          text: 'Editar Programa',
          icon: 'create',
          handler: () => {
            this.editProgram(program);
          },
        },
        {
          text: 'Ver Vuelos Generados',
          icon: 'airplane',
          handler: () => {
            this.viewGeneratedFlights(program);
          },
        },
        {
          text: 'Cambiar Estado',
          icon: 'swap-horizontal',
          handler: () => {
            this.changeProgramStatus(program);
          },
        },
        {
          text: 'Eliminar',
          icon: 'trash',
          role: 'destructive',
          handler: () => {
            this.deleteProgram(program);
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

  viewProgramDetails(program: FlightProgram) {
    console.log('Ver detalles del programa:', program);
  }

  async editProgram(program: FlightProgram) {
    console.log('Editar programa:', program);
    const toast = await this.toastController.create({
      message: 'Función de edición en desarrollo',
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

  viewGeneratedFlights(program: FlightProgram) {
    console.log('Ver vuelos generados del programa:', program);
  }

  async changeProgramStatus(program: FlightProgram) {
    const alert = await this.alertController.create({
      header: 'Cambiar Estado',
      message: `Selecciona el nuevo estado para el programa ${program.flightNumber}`,
      inputs: this.statusOptions.map((status) => ({
        name: 'status',
        type: 'radio',
        label: status.label,
        value: status.value,
        checked: program.status === status.value,
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
                program.status = data;
                program.statusText = selectedStatus.label;
                this.showToast(`Estado actualizado a: ${selectedStatus.label}`);
              }
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async deleteProgram(program: FlightProgram) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de que deseas eliminar el programa ${program.flightNumber}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.programs = this.programs.filter((p) => p.id !== program.id);
            this.applyFilters();
            this.showToast('Programa eliminado correctamente');
          },
        },
      ],
    });
    await alert.present();
  }

  async addNewProgram() {
    const toast = await this.toastController.create({
      message: 'Función de agregar programa en desarrollo',
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'active':
        return 'success';
      case 'suspended':
        return 'danger';
      case 'seasonal':
        return 'warning';
      default:
        return 'medium';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'active':
        return 'checkmark-circle';
      case 'suspended':
        return 'pause-circle';
      case 'seasonal':
        return 'time';
      default:
        return 'help-circle';
    }
  }

  getFrequencyIcon(frequency: string): string {
    switch (frequency) {
      case 'daily':
        return 'today';
      case 'weekly':
        return 'calendar';
      case 'seasonal':
        return 'leaf';
      default:
        return 'time';
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
    console.log('Refreshing programs...');
    setTimeout(() => {
      this.applyFilters();
      event.target.complete();
      this.showToast('Programas actualizados');
    }, 1500);
  }
}
